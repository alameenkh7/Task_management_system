import { Controller, Logger } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { RabbitMQService } from './rabbitmq.service'

@Controller()
export class RabbitMQController {
  private readonly logger = new Logger('RabbitMQController')

  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @MessagePattern('task_created')
  handleTaskCreated(@Payload() message: any) {
    this.logger.log('Received task_created message:', message)

    this.rabbitMQService.logMessage('task_created', message)
  }
}
