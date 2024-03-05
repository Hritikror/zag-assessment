import { HttpException, Injectable } from '@nestjs/common';
import { Users } from 'src/models/Users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(Users) private userRepository: Repository<Users>,
      ) {}
    
      async createUser(createUserDto: CreateUserDto): Promise<Users> {
        const newUser = new Users();
        const { username, email, role,  password } = createUserDto;

        if(await this.findUserByEmail(email)){
            throw new HttpException("User with given email already exists",400);
        }
        newUser.username = username;
        newUser.email = email;
        newUser.role = role;
        newUser.password = password;
    
        return await this.userRepository.save(newUser);
      }
    
      async findUserByEmail(email: string) {
        return await this.userRepository.findOne({ email });
      }

      async fetchUserFromToken(req: Request) {
        const { token } = req['token']
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return this.findUserByEmail(decodedToken['userEmail']);
      }


}
