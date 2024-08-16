import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'nashville-group',
          },
        },
      },
    ]),
  ],
  providers: [ProducerService],
})
export class AppModule {}
