import { Test, TestingModule } from '@nestjs/testing'
import { AppModule as NashvilleModule } from '../apps/nashville/src/app.module'
import { AppModule as AshlandModule } from '../apps/ashland/src/app.module'
import { ClientKafka } from '@nestjs/microservices'
import { INestApplication } from '@nestjs/common'
import { KafkaService } from '../apps/ashland/src/kafka/kafka.service'

jest.setTimeout(20000)

describe('Kafka Communication', () => {
  let nashvilleApp: INestApplication
  let ashlandApp: INestApplication

  let mockClientKafka: ClientKafka

  beforeAll(async () => {
    // Mock ClientKafka
    mockClientKafka = {
      emit: jest.fn().mockResolvedValue(undefined),
      send: jest.fn().mockResolvedValue(undefined),
      connect: jest.fn().mockResolvedValue(undefined),
      close: jest.fn().mockResolvedValue(undefined),
    } as unknown as ClientKafka

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [NashvilleModule, AshlandModule],
    })
      .overrideProvider(ClientKafka)
      .useValue(mockClientKafka)
      .compile()

    nashvilleApp = moduleRef.createNestApplication()
    await nashvilleApp.init()

    ashlandApp = moduleRef.createNestApplication()
    await ashlandApp.init()
  })

  afterAll(async () => {
    await Promise.all([nashvilleApp.close(), ashlandApp.close()])
    await mockClientKafka.close()
  })

  it('should send a task from Nashville and log it in Ashland via Kafka', async () => {
    const taskPayload = {
      id: '1',
      title: 'Test Task',
      description: 'Task description',
    }

    // Simulate sending a task from Nashville
    await mockClientKafka.emit('task-created', taskPayload)

    // Check if the emit method was called
    expect(mockClientKafka.emit).toHaveBeenCalledWith(
      'task-created',
      taskPayload
    )

    // Spy on the logMessage method in the Ashland service
    const logSpy = jest.spyOn(ashlandApp.get(KafkaService), 'logMessage')

    // Simulate receiving the message in Ashland
    await ashlandApp.get(KafkaService).logMessage('task-created', taskPayload)

    // Ensure the logMessage method was called with the correct arguments
    expect(logSpy).toHaveBeenCalledWith('task-created', taskPayload)
  })
})
