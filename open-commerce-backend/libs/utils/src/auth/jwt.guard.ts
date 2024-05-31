import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AUTH_SERVICE } from '../constants/services';

import { ClientGrpc } from '@nestjs/microservices';

import { AuthenticationServiceClientImpl } from '../types/auth';

@Injectable()
export class JwtGuard implements CanActivate, OnModuleInit {
  private authService: AuthenticationServiceClientImpl;
  constructor(
    @Inject(AUTH_SERVICE) private readonly client: ClientGrpc,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  onModuleInit() {
    this.authService =
      this.client.getService<AuthenticationServiceClientImpl>(AUTH_SERVICE);
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      //request['user'] = payload;

      return this.authService.authenticate({
        gRPCAuthToken: payload,
      });
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
