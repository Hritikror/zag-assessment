import { IsNotEmpty } from "class-validator";

export class CreateListingDto {
  @IsNotEmpty()
  businessName: string;

  @IsNotEmpty()
  businessPhone: string;

  @IsNotEmpty()
  address: string;

  isDeleted: boolean = false;
}