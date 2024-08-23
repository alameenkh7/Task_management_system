import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { RabbitMQService } from './rabbitmq.service'

@Controller()
export class RabbitMQController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @MessagePattern('task_created')
  handleTaskCreated(@Payload() message: any) {
    this.rabbitMQService.logMessage('task_created', message)
  }
}
