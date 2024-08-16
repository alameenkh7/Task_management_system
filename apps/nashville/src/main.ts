import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'nashville-consumer',
      },
    },
  })

  await app.startAllMicroservices()
  const port = process.env.PORT || 3003
  await app.listen(port)
}
bootstrap()
