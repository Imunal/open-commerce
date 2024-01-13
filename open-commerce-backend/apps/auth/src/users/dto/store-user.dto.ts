import { IsEmail, IsStrongPassword } from 'class-validator';

export class StoreUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
