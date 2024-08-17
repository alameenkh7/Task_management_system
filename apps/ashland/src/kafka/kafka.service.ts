// src/kafka/kafka.service.ts
import { Injectable, Logger } from '@nestjs/common'
import { OnModuleInit } from '@nestjs/common'
import { Inject } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'

@Injectable()
export class KafkaService implements OnModuleInit {
  private readonly logger = new Logger(KafkaService.name)

  constructor(@Inject('TASK_SERVICE') private readonly client: ClientKafka) {}

  async onModuleInit() {
    // Connect to Kafka
    await this.client.connect()

    // You can setup a listener for each topic here
    const topics = ['task-created', 'task-updated', 'task-deleted']
    topics.forEach(topic => {
      this.client.subscribeToResponseOf(topic)
    })
  }

  async logMessage(topic: string, message: any) {
    this.logger.log(
      `Received message from ${topic}: ${JSON.stringify(message)}`
    )
  }
}
