import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from 'src/models/enums/roles.enum';

export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(UserRole, { message: 'Invalid role. Must be one of: ADMIN, OWNER, CUSTOMER' })
    role: UserRole;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
  }