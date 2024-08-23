import { Injectable } from '@nestjs/common'
import { Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class RabbitMQService {
  constructor(
    @Inject('TASK_SERVICE') private readonly rabbitMQClient: ClientProxy
  ) {}

  async emitTaskCreated(task: any) {
    return this.rabbitMQClient.emit('task_created', task)
  }
}
