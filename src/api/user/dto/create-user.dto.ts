import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from 'src/models/enums/roles.enum';

export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsEnum(UserRole, { message: 'Invalid role. Must be one of: ADMIN, OWNER, CUSTOMER' })
    role: UserRole;

    @IsNotEmpty()
    password: string;
  }