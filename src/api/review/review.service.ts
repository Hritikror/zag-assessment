import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/models/Review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { Users } from 'src/models/Users.entity';
import { Listing } from 'src/models/Listing.entity';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Constants } from 'src/Constants';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(Listing) private listingRepository: Repository<Listing>,
  ) {}

  async createReview(createReviewDto: CreateReviewDto, loggedInUser: Users) {
    const review = new Review();
    Object.assign(review, createReviewDto);
    const listing: Listing = await this.listingRepository.findOne(createReviewDto.listingID);
    if(listing) {
        review.listing = listing;
        review.user = loggedInUser;
        return await this.reviewRepository.save(review);
    }
    throw new HttpException(`Something went wrong during saving review, maybe listing with listingID ${createReviewDto.listingID} not exist`,401)
    
  }

  async getReviewById(id: string) {
    const review = await this.reviewRepository.findOne(id);
    if(review) return review;
    else throw new HttpException(`review with id ${id} not found`,401);
  }

  async updateReviewAsAdmin(id: string, updateReviewDto: UpdateReviewDto, user: Users) {
    //ADMIN can update any thing in table
    const review = await this.reviewRepository.findOne(id);
    if(review) {
      Object.assign(review, updateReviewDto);
      return await this.reviewRepository.save(review);
    }
    throw new HttpException(`Something went wrong during updating review, maybe review with id ${id} no exists`, 401);
  }

  async updateReviewAsOwner(id: string, updateReviewDto: UpdateReviewDto, user: Users) {
    //OWNER can only update the respone of own-listing
    const review = await this.reviewRepository.findOne(id, { relations: ['user'] });
    if(review && review.listing.owner.email === user.email) {
      review.response = updateReviewDto.response;
      return await this.reviewRepository.save(review);
    }
    throw new HttpException(`Something went wrong during updating review, maybe review with id ${id} not exists OR you don't own this listing`, 401);

  }

  async updateReviewAsCustomer(id: string, updateReviewDto: UpdateReviewDto, user: Users) {

    //Customer can only update rating and comment only of its own review
    const review = await this.reviewRepository.findOne(id, { relations: ['user'] });
    if(review && review.user.email === user.email) {
      review.comment = updateReviewDto.comment;
      review.rating = updateReviewDto.rating;
      return await this.reviewRepository.save(review);
    }
    throw new HttpException(`Something went wrong during updating review, maybe review with id ${id} not exists OR you don't own this review`, 401);

  }

  async deleteReview(id: string, user: Users) {
    const review = await this.reviewRepository.findOne(id, { relations: ['user'] });
    if(review) {
        if(user.role == Constants.ADMIN ||  review.user.email === user.email) {
          review.isDeleted = true;
          return await this.reviewRepository.save(review);
        }
        throw new HttpException(`Not authorized to deleting review, maybe review with id ${id} not belongs to you`, 401);
    }
    throw new HttpException(`Something went wrong during deleting review, maybe review with id ${id} not exists`, 401);

  }

}
