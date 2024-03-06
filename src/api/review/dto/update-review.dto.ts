import { Transform } from "class-transformer";
import { IsNotEmpty, Max, Min } from "class-validator";

export class UpdateReviewDto {

    @Transform(({ value }) => parseInt(value))
    @Min(1, { message: 'Rating must be at least 1' })
    @Max(5, { message: 'Rating must be at most 5' })
    rating: number;
  
    comment: string;

    response: string;
}