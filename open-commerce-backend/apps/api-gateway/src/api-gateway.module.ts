import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'node:path';
import { AUTH_PACKAGE_NAME, AUTHENTICATION_SERVICE_NAME } from '@app/utils';
import { LoggerModule } from '@app/utils';

@Module({
  imports: [
    LoggerModule,
    //Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),

    //Authentication gRPC
    ClientsModule.register([
      {
        name: AUTHENTICATION_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(process.env.PROTO_PATH || 'protos', 'auth.proto'),
          loader: {
            longs: Number,
          },
          url: 'microservice-auth:5001',
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
