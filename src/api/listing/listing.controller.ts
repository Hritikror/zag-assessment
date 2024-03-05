import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ListingService } from './listing.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { Request } from 'express';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/guards/roles.decorator';
import { UserService } from '../user/user.service';
import { UpdateListingDto } from './dto/update-listing.dto';


@Controller('listing')
@UseGuards(RolesGuard)
@UsePipes(new ValidationPipe({ transform: true }))
export class ListingController {
  constructor(private readonly listingService: ListingService, private readonly userService: UserService) {}

  @Post('/create')
  @Roles('ADMIN', 'OWNER') 
  async createListing(@Body() createListingDto: CreateListingDto, @Req() req: Request) {
    const loggedInUser = await this.userService.fetchUserFromToken(req);
    return await this.listingService.createListing(createListingDto, loggedInUser)
  }

  @Get(':id')
  async readListings(@Param('id') id: string) {
    return await this.listingService.getListingById(id);
  }

  @Put('/update/:id')
  @Roles('ADMIN', 'OWNER') 
  async updateListings(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto, @Req() req: Request) {
    const loggedInUser = await this.userService.fetchUserFromToken(req);
    return await this.listingService.updateListingById(id, updateListingDto, loggedInUser);
  }

  @Delete('/delete/:id')
  @Roles('ADMIN') 
  async deleteListings(@Param('id') id: string) {
    return await this.listingService.deleteListingById(id);
  }
}
