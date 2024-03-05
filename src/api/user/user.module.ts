import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { Users } from 'src/models/Users.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    providers: [UserService],
    exports: [UserService],
  })
export class UserModule {}
