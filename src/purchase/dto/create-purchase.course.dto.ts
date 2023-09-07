import { IsNotEmpty } from 'class-validator';

export class CreatePurchaseCourseDto {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  courseId: string;
  @IsNotEmpty()
  price: number;
}
