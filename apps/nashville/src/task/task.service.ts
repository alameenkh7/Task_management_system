import { Inject, Injectable } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_SERVICE') private readonly kafkaClient: ClientKafka
  ) {}

  // Example method to communicate with the Task Manager service via Kafka
  async createTask(task: any) {
    return this.kafkaClient.send('task-created', task)
  }
}
