import { Injectable } from '@nestjs/common';

//Dto
import { StoreUserDto } from './dto/store-user.dto';

//Services
import { PrismaService } from '@app/utils/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        user_email: email,
      },
    });
  }

  async store(storeUserDto: StoreUserDto) {
    return await this.prisma.user.create({
      data: {
        user_email: storeUserDto.email,
        user_password: storeUserDto.password,
      },
    });
  }
}
