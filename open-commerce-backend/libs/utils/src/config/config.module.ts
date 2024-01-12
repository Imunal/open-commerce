import { Module } from '@nestjs/common';
import { ConfigModule as RawConfigModule } from '@nestjs/config';

@Module({
  imports: [RawConfigModule.forRoot()],
})
export class ConfigModule {}
