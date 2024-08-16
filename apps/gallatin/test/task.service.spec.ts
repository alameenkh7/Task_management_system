import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskService } from '../src/service/task.service';
import { Task } from '../src/entities/task.entity';

const mockTask = {
  id: '1',
  title: 'Test Task',
  description: 'This is a test task',
  status: 'OPEN',
};

const mockTaskRepository = {
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn().mockResolvedValue(mockTask),
  find: jest.fn().mockResolvedValue([mockTask]),
  findOne: jest.fn().mockResolvedValue(mockTask),
  update: jest.fn().mockResolvedValue(mockTask),
  delete: jest.fn().mockResolvedValue(undefined),
};

describe('TaskService', () => {
  let service: TaskService;
  let repository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    const createTaskDto: Partial<Task> = {
      title: 'Test Task',
      description: 'This is a test task',
    };

    expect(await service.createTask(createTaskDto)).toEqual(mockTask);
    expect(repository.create).toHaveBeenCalledWith(createTaskDto);
    expect(repository.save).toHaveBeenCalledWith(createTaskDto);
  });

  it('should return all tasks', async () => {
    expect(await service.getTasks()).toEqual([mockTask]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return a task by id', async () => {
    expect(await service.getTaskById('1')).toEqual(mockTask);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('should update a task', async () => {
    const updateTaskDto = { title: 'Updated Task' };
    expect(await service.updateTask('1', updateTaskDto)).toEqual(mockTask);
    expect(repository.update).toHaveBeenCalledWith('1', updateTaskDto);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('should delete a task', async () => {
    await service.deleteTask('1');
    expect(repository.delete).toHaveBeenCalledWith('1');
  });
});
