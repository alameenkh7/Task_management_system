import { Test, TestingModule } from '@nestjs/testing'
import { AppService } from '../src/app.service'
import { AppController } from '../src/app.controller'

describe('AppController', () => {
  let appController: AppController
  let appService: AppService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            createTask: jest.fn(),
            getTasks: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile()

    appController = app.get<AppController>(AppController)
    appService = app.get<AppService>(AppService)
  })

  describe('createTask', () => {
    it('should call AppService.createTask with the provided task', async () => {
      const task = { title: 'Test Task' }
      await appController.createTask(task)
      expect(appService.createTask).toHaveBeenCalledWith(task)
    })
  })

  describe('getTasks', () => {
    it('should return an array of tasks', async () => {
      const result = await appController.getTasks()
      expect(result).toEqual([])
    })
  })
})
