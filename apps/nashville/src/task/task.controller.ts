import { Controller, Get, Post, Body, Logger } from '@nestjs/common'
import { TaskService } from './task.service'

interface Task {
  name: string
  description: string
}

@Controller('tasks')
export class TaskController {
  private readonly logger = new Logger('TaskController')
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() task: Task) {
    this.logger.log('Creating task:', task)
    await this.taskService.createTask(task)
    this.logger.log('Task created successfully:', task)
    return {
      status: 'success',
      message: 'Task created successfully',
      task,
    }
  }

  @Get()
  async getTasks() {
    this.logger.log('Fetching tasks')
    // for now empty here we retrieve all tasks
    return []
  }
}
