import { HttpException, Injectable } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from 'src/models/Listing.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/models/Users.entity';
import { UserService } from '../user/user.service';
import { UpdateListingDto } from './dto/update-listing.dto';
import { Constants } from 'src/Constants';

@Injectable()
export class ListingService {
    constructor(
        @InjectRepository(Listing) private listingRepository: Repository<Listing>,
        private usersService: UserService
      ) {}

    async createListing(createListingDto: CreateListingDto, loggedInUser: Users) {
        const listing = new Listing();
        Object.assign(listing, createListingDto);
        listing.owner = loggedInUser;
        return await this.listingRepository.save(listing);
    }

    async getListingById(id : string) {
        const listing = await this.listingRepository.findOne(id);
        if(listing) return listing;
        else throw new HttpException(`Listing with id ${id} not found`,401);
    }

    async updateListingById(id: string, updateListingDto: UpdateListingDto, user: Users) {
        const listing = await this.listingRepository.findOne(id);
        //listing owner only update its listing only 
        if(listing && (listing.owner === user || listing.owner.role === Constants.ADMIN)) {  //only 'listing owner' and 'admin' can update 
            Object.assign(listing, updateListingDto);
            return await this.listingRepository.save(listing);
        } 
        else throw new HttpException(`Listing with id ${id} not found`,401);
    }

    async deleteListingById(id: string) {
        const listing = await this.listingRepository.findOne(id);
        if(listing) {  
            listing.isDeleted = true
            return await this.listingRepository.save(listing);
        } 
        else throw new HttpException(`Listing with id ${id} not found`,401);
    }


}
