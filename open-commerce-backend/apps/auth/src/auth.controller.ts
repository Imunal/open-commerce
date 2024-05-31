import {
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

//Guards
import { LocalAuthGuard } from './guards/local.guard';
import { AuthenticatedUser } from './authenticated-user.decorator';
import { User } from '@prisma/client';
import { MessagePattern } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt.guard';
import {
  AuthenticationServiceController,
  AuthenticationServiceControllerMethods,
} from '@app/utils';

@Controller('authenticate')
@AuthenticationServiceControllerMethods()
export class AuthController implements AuthenticationServiceController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('authenticate')
  async authenticate(@AuthenticatedUser() user: User) {
    try {
      return await this.authService.authenticate(user);
    } catch (error) {
      throw new UnauthorizedException('Cannot create token');
    }
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticateMicroservice() {}
}
