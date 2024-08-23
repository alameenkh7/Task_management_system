import { Test, TestingModule } from '@nestjs/testing'
import { TaskService } from '../src/task/task.service'
import { TaskController } from '../src/task/task.controller'

describe('AppController', () => {
  let appController: TaskController
  let appService: TaskService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            createTask: jest.fn(),
            getTasks: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile()

    appController = app.get<TaskController>(TaskController)
    appService = app.get<TaskService>(TaskService)
  })

  describe('createTask', () => {
    it('should call AppService.createTask with the provided task', async () => {
      const task = { name: 'Test Task', description: 'new description' }
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
