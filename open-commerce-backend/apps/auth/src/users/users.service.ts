import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import argon2 from 'argon2';

//Dto
import { StoreUserDto } from './dto/store-user.dto';

//Services
import { PrismaService } from '@app/utils/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async validate(user_email: string, user_typed_password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        user_email,
      },
    });

    if (!user) {
      throw new NotFoundException('Email, or password are invalid');
    }

    if (!(await argon2.verify(user.user_password, user_typed_password))) {
      throw new UnauthorizedException('Email, or password are invalid');
    }

    return user;
  }

  async findUserById(user_id: number) {
    return await this.prisma.user.findFirstOrThrow({
      where: {
        user_id,
      },
    });
  }

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
        user_password: await argon2.hash(storeUserDto.password),
      },
    });
  }
}
