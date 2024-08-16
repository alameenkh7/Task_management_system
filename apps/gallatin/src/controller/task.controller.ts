import { Controller, Get, Post, Body } from '@nestjs/common';
import { TaskService } from '../service/task.service';
import { Task } from '../entities/task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Post()
  async create(@Body() task: Partial<Task>): Promise<Task> {
    return this.taskService.create(task);
  }
}
