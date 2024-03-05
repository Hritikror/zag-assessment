import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/models/Review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { Users } from 'src/models/Users.entity';
import { Listing } from 'src/models/Listing.entity';

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
    throw new HttpException("Something went wrong during saving review, maybe listingID is wrong",401)
    
  }

  async getReviewById(id: string) {
    const review = await this.reviewRepository.findOne(id);
    if(review) return review;
    else throw new HttpException(`review with id ${id} not found`,401);
  }
}
