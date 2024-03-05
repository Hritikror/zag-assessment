import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TokenMiddleware } from 'src/middleware/token.middleware';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from 'src/models/Listing.entity';
import { UserService } from '../user/user.service';
import { Users } from 'src/models/Users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Listing,Users])],
  controllers: [ListingController],
  providers: [ListingService,UserService]
})
export class ListingModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(TokenMiddleware).forRoutes(ListingController);
    }
}
