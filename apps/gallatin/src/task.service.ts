import { Inject, Injectable } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class TaskService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  @MessagePattern('test-topic')
  async handleMessage(@Payload() message: any) {
    console.log('Received message:', message.value);
  }
}
