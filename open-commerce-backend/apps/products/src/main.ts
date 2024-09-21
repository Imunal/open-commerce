import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);

  //Logger
  app.useLogger(app.get(Logger));
}
bootstrap();
