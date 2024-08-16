import { Module } from '@nestjs/common'
import { ProducerService } from './producer.service'
import { ConfigModule } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'TASK_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'nashville',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'nashville-consumer',
          },
        },
      },
    ]),
  ],
  providers: [ProducerService, AppService],
})
export class AppModule {}
