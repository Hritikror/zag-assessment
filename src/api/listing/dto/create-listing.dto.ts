import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateListingDto {
  @ApiProperty()
  @IsNotEmpty()
  businessName: string;

  @ApiProperty()
  @IsNotEmpty()
  businessPhone: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  isDeleted: boolean = false;
}