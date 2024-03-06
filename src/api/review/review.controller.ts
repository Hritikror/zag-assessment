import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { RolesGuard } from 'src/guards/role.guard';
import { ReviewService } from './review.service';
import { UserService } from '../user/user.service';
import { Roles } from 'src/guards/roles.decorator';
import { Request, response } from 'express';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('review')
@Controller('review')
@UseGuards(RolesGuard)
@UsePipes(new ValidationPipe({ transform: true }))
export class ReviewController {
  constructor(private readonly reviewService: ReviewService, private readonly userService: UserService) {}

  @Post('/create')
  @Roles('ADMIN', 'CUSTOMER') 
  async createReview(@Body() createReviewDto: CreateReviewDto, @Req() req: Request) {
    const loggedInUser = await this.userService.fetchUserFromToken(req);
    return await this.reviewService.createReview(createReviewDto,loggedInUser);
  }

  @Get(':id')
  async readReview(@Param('id') id: string) {
    return await this.reviewService.getReviewById(id);
  }

  @Put('/update/:id')
  async updateReview(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto, @Req() req: Request) {
    const loggedInUser = await this.userService.fetchUserFromToken(req);
    switch(loggedInUser.role) {
      case "ADMIN":
        return await this.reviewService.updateReviewAsAdmin(id, updateReviewDto, loggedInUser);
      case "OWNER":
        return await this.reviewService.updateReviewAsOwner(id, updateReviewDto, loggedInUser);
      case "CUSTOMER":
        return await this.reviewService.updateReviewAsCustomer(id, updateReviewDto, loggedInUser);
      default:
        throw new HttpException("Role error encountered",401);   //well it never happen
    }
  }

  @Delete('/delete/:id')
  @Roles('ADMIN', 'CUSTOMER')
  async deleteReview(@Param('id') id: string, @Req() req: Request) {
    const loggedInUser = await this.userService.fetchUserFromToken(req);
    return this.reviewService.deleteReview(id, loggedInUser);
  }
}
