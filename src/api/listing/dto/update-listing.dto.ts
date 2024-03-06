import { ApiProperty } from "@nestjs/swagger";

export class UpdateListingDto {
  @ApiProperty()
  businessName: string;

  @ApiProperty()
  businessPhone: string;

  @ApiProperty()
  address: string;
}