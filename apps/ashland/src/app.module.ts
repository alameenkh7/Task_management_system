import { Module } from '@nestjs/common'
import { RabbitMQModule } from './rabbitmq/rabbitmq.module'
import { RabbitMQController } from './rabbitmq/rabbitmq.controller'

@Module({
  imports: [RabbitMQModule],
  controllers: [RabbitMQController],
})
export class AppModule {}
