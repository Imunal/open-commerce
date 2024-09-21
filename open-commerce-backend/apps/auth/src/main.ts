import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Logger } from 'nestjs-pino';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from '@app/utils';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  //Connect gRPC
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: AUTH_PACKAGE_NAME,
      protoPath: join(process.env.PROTO_PATH || 'protos', 'auth.proto'),
      loader: {
        longs: Number,
      },
      url: '0.0.0.0:5001',
    },
  });

  //Logger
  app.useLogger(app.get(Logger));

  await app.startAllMicroservices();
}
bootstrap();
