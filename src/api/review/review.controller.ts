import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { RolesGuard } from 'src/guards/role.guard';
import { ReviewService } from './review.service';
import { UserService } from '../user/user.service';
import { Roles } from 'src/guards/roles.decorator';
import { Request } from 'express';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';


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
   
  }

  @Delete('/delete/:id')
  @Roles('ADMIN', 'CUSTOMER')
  async deleteReview(@Param('id') id: string) {
  
  }
}
