// src/kafka/kafka.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing'
import { KafkaService } from './kafka.service'
import { ClientKafka } from '@nestjs/microservices'
import { Logger } from '@nestjs/common'

describe('KafkaService', () => {
  let service: KafkaService
  let clientKafka: ClientKafka

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KafkaService,
        {
          provide: 'TASK_SERVICE',
          useValue: {
            connect: jest.fn(),
            subscribeToResponseOf: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<KafkaService>(KafkaService)
    clientKafka = module.get<ClientKafka>('TASK_SERVICE')
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should subscribe to topics on module init', async () => {
    const subscribeSpy = jest.spyOn(clientKafka, 'subscribeToResponseOf')
    await service.onModuleInit()
    expect(subscribeSpy).toHaveBeenCalledTimes(3)
    expect(subscribeSpy).toHaveBeenCalledWith('task-created')
    expect(subscribeSpy).toHaveBeenCalledWith('task-updated')
    expect(subscribeSpy).toHaveBeenCalledWith('task-deleted')
  })

  it('should log the message', async () => {
    const loggerSpy = jest.spyOn(Logger.prototype, 'log')
    const message = { id: '1', title: 'Test Task' }
    await service.logMessage('task-created', message)
    expect(loggerSpy).toHaveBeenCalledWith(
      `Received message from task-created: ${JSON.stringify(message)}`
    )
  })
})
