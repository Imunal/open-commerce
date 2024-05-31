import { IsEmail, IsStrongPassword } from 'class-validator';

export class StoreUserDto {
  @IsEmail()
  user_email: string;

  @IsStrongPassword()
  user_password: string;
}
