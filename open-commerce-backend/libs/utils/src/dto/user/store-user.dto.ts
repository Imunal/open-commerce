import { IsEmail, IsNotEmpty } from 'class-validator';

export class StoreUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
