import { IsNotEmpty } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  videoNo: number;
  @IsNotEmpty()
  courseId: string;
}
