/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export interface Authentication {
  gRPCAuthToken: string;
}

export interface UserMessage {
  userId: string;
  userEmail: string;
  userPassword: string;
}

export const AUTH_PACKAGE_NAME = 'auth';

export interface AuthenticationServiceClient {
  authenticate(request: Authentication): Observable<UserMessage>;
}

export interface AuthenticationServiceController {
  authenticate(
    request: Authentication,
  ): Promise<UserMessage> | Observable<UserMessage> | UserMessage;
}

export function AuthenticationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['authenticate'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('AuthenticationService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('AuthenticationService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const AUTHENTICATION_SERVICE_NAME = 'AuthenticationService';
