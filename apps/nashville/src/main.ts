import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = process.env.PORT || 3003
  await app.listen(port)
  const logger = new Logger('NashvilleService')
  logger.log(`Nashville service is running on port ${port}`)
}

bootstrap()
