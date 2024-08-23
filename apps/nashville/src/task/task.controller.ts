import { Controller, Get, Post, Body } from '@nestjs/common'
import { TaskService } from './task.service'

interface Task {
  name: string
  description: string
}

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() task: Task) {
    return this.taskService.createTask(task)
  }

  @Get()
  async getTasks() {
    // for now empty here here we retrieve all tasks
    return []
  }
}
