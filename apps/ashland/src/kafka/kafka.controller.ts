// src/kafka/kafka.controller.ts
import { Controller, Logger } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'
import { KafkaService } from './kafka.service'

@Controller()
export class KafkaController {
  private readonly logger = new Logger(KafkaController.name)

  constructor(private readonly kafkaService: KafkaService) {}

  @EventPattern('task-created')
  handleTaskCreated(@Payload() message: any) {
    this.kafkaService.logMessage('task-created', message)
  }

  @EventPattern('task-updated')
  handleTaskUpdated(@Payload() message: any) {
    this.kafkaService.logMessage('task-updated', message)
  }

  @EventPattern('task-deleted')
  handleTaskDeleted(@Payload() message: any) {
    this.kafkaService.logMessage('task-deleted', message)
  }
}
