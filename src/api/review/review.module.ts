import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TokenMiddleware } from 'src/middleware/token.middleware';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from 'src/models/Review.entity';
import { Listing } from 'src/models/Listing.entity';
import { UserService } from '../user/user.service';
import { Users } from 'src/models/Users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Review,Listing,Users])],
    controllers: [ReviewController],
    providers: [ReviewService,UserService]
})
export class ReviewModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(TokenMiddleware).forRoutes(ReviewController);
    }
}