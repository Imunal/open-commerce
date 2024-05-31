import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { UsersService } from '../users/users.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      usernameField: 'user_email',
    });
  }
  async validate(user_email: string, user_typed_password: string) {
    try {
      return await this.usersService.validate(user_email, user_typed_password);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
