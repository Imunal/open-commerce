import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import argon2 from 'argon2';

//Dto
import { StoreUserDto } from '@app/utils/dto/user/store-user.dto';

//Services
import { PrismaService } from '@app/utils/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Validate user
   * @param user_email
   * @param user_typed_password
   * @returns Promise<User>
   */
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

  /**
   * Find user by id
   * @param user_id
   * @returns Promise<User>
   */
  async findUserById(user_id: number) {
    return await this.prisma.user.findFirst({
      where: {
        user_id,
      },
    });
  }

  /**
   * Find user by e-mail
   * @param user_email
   * @returns Promise<User>
   */
  async findUserByEmail(user_email: string) {
    return await this.prisma.user.findFirst({
      where: {
        user_email,
      },
    });
  }

  /**
   * Store new user
   * @param store_user_dto
   * @returns Promise<User>
   */
  async store(store_user_dto: StoreUserDto) {
    return await this.prisma.user.create({
      data: {
        user_email: store_user_dto.email,
        user_password: await argon2.hash(store_user_dto.password),
      },
    });
  }
}
