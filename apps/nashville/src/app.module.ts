import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { TaskService } from './task/task.service'

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
  providers: [TaskService],
})
export class AppModule {}
