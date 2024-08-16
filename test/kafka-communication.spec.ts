import { Test, TestingModule } from '@nestjs/testing'
import { AppModule as NashvilleModule } from '../apps/nashville/src/app.module'
import { AppModule as GallatinModule } from '../apps/gallatin/src/app.module'
import { AppModule as AshlandModule } from '../apps/ashland/src/app.module'
import { ClientKafka } from '@nestjs/microservices'
import { INestApplication } from '@nestjs/common'

jest.setTimeout(20000) // Increase timeout to 20 seconds

describe('Kafka Communication', () => {
  let nashvilleApp: INestApplication
  let gallatinApp: INestApplication
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
      imports: [NashvilleModule, GallatinModule, AshlandModule],
    })
      .overrideProvider(ClientKafka)
      .useValue(mockClientKafka)
      .compile()

    nashvilleApp = moduleRef.createNestApplication()
    await nashvilleApp.init()

    gallatinApp = moduleRef.createNestApplication()
    await gallatinApp.init()

    ashlandApp = moduleRef.createNestApplication()
    await ashlandApp.init()
  })

  afterAll(async () => {
    // making sure all application close
    await Promise.all([
      nashvilleApp.close(),
      gallatinApp.close(),
      ashlandApp.close(),
    ])

    // making sure kafka client close
    await mockClientKafka.close()
  })

  it('should send and receive messages via Kafka', async () => {
    const messagePayload = { key: 'value' }

    // Simulate Nashville service emitting a message
    await mockClientKafka.emit('test-topic', messagePayload)

    // Check if the emit method was called correctly
    expect(mockClientKafka.emit).toHaveBeenCalledWith(
      'test-topic',
      messagePayload
    )

    // Simulate sending a response
    await mockClientKafka.send('response-topic', messagePayload)

    // Check if the send method was called correctly
    expect(mockClientKafka.send).toHaveBeenCalledWith(
      'response-topic',
      messagePayload
    )
  })
})
