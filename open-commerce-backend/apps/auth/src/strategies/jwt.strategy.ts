import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken() || request?.gRPCAuthToken,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate({ user_id }: { user_id: number }) {
    try {
      return this.usersService.findUserById(user_id);
    } catch (error) {
      throw new UnauthorizedException('Missing token');
    }
  }
}
