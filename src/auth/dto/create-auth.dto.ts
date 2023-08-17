import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  userName: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
