import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { StoreUserDto } from './dto/store-user.dto';
import { UsersService } from './users.service';
import { AuthenticatedUser } from '../authenticated-user.decorator';
import { User } from '@prisma/client';
import { JwtAuthGuard } from '../guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async storeUser(@Body() storeUserDto: StoreUserDto) {
    return this.userService.store(storeUserDto);
  }

  /**
   * ONLY TO TEST AUTH
   * @param user
   * @returns
   */
  @Get('')
  @UseGuards(JwtAuthGuard)
  async getUser(@AuthenticatedUser() user: User) {
    return user;
  }
}
