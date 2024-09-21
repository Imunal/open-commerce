import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';

import helmet from 'helmet';
//import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule, { cors: true });

  //Swagger
  const config = new DocumentBuilder()
    .setTitle('OpenCommerce')
    .setDescription('OpenCommerce OpenAPI')
    .setVersion('0.0')
    .addTag('e-commerce')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  //Logger
  app.useLogger(app.get(Logger));

  //Helmet
  app.use(helmet());

  //CSURF
  //app.use(csurf());

  //Run module
  await app.listen(3000);
}
bootstrap();
