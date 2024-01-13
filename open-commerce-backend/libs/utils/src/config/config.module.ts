import { Module } from '@nestjs/common';
import { ConfigModule as RawConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [RawConfigModule.forRoot()],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
