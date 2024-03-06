import { ApiProperty } from "@nestjs/swagger";

export class LogInUserDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
  }