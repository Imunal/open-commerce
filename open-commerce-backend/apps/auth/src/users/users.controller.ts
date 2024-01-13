import { Body, Controller, Post } from '@nestjs/common';
import { StoreUserDto } from './dto/store-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  async storeUser(@Body() storeUserDto: StoreUserDto) {
    return this.userService.store(storeUserDto);
  }
}
