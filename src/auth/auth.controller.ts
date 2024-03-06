import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/api/user/dto/create-user.dto';
import { Users } from 'src/models/Users.entity';
import { LogInUserDto } from './dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth') // API Documentation
@Controller('auth')
@UsePipes(new ValidationPipe({ transform: true }))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return this.authService.createUser(createUserDto);
  }

  @Post('/login')
  async login(@Body() authLoginDto: LogInUserDto) {
    return this.authService.login(authLoginDto);
  }


}
