import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async authenticate(user: User) {
    const payload = {
      user_id: user.user_id,
    };

    const exp = new Date();
    exp.setSeconds(
      exp.getSeconds() + this.configService.get<number>('JWT_EXP'),
    );

    const token = this.jwtService.sign(payload);
    return token;
  }
}
