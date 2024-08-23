import { Injectable } from '@nestjs/common'
import { RabbitMQService } from '../rabbitmq/rabbitmq.service'

@Injectable()
export class TaskService {
  constructor(private readonly rabbitMqService: RabbitMQService) {}

  // Example method to communicate with the Task Manager service via Kafka
  async createTask(task: any) {
    return this.rabbitMqService.emitTaskCreated(task)
  }
}
