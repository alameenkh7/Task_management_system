import { Injectable, Logger } from '@nestjs/common'
import { Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class RabbitMQService {
  private readonly logger = new Logger(RabbitMQService.name)

  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy
  ) {}

  async logMessage(topic: string, message: any) {
    this.logger.log(
      `Received message from ${topic}: ${JSON.stringify(message)}`
    )
  }
}
