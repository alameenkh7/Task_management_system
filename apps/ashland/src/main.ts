import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Transport } from '@nestjs/microservices'
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'task_queue',
      queueOptions: {
        durable: false,
      },
    },
  })
  await app.startAllMicroservices()
  const port = process.env.PORT || 3001
  await app.listen(port)
  const logger = new Logger('AshlandService')
  logger.log(`Ashland service is running on port ${port}`)
}
bootstrap()
