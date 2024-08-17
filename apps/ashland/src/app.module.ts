// src/app.module.ts
import { Module } from '@nestjs/common'
import { ConfigModule } from './config/config.module'
import { KafkaModule } from './kafka/kafka.module'
import { KafkaController } from './kafka/kafka.controller'

@Module({
  imports: [ConfigModule, KafkaModule],
  controllers: [KafkaController],
  providers: [],
})
export class AppModule {}
