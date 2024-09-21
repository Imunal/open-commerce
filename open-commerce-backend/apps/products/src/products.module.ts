import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { LoggerModule } from '@app/utils';

@Module({
  imports: [LoggerModule, ConfigModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
