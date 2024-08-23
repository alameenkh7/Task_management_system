import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TaskService } from './task/task.service'
import { TaskController } from './task/task.controller'
import { RabbitMQModule } from './rabbitmq/rabbitmq.module'

@Module({
  imports: [ConfigModule.forRoot(), RabbitMQModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class AppModule {}
