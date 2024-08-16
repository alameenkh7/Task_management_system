import { Controller, Get, Post, Body } from '@nestjs/common'
import { AppService } from './app.service'

@Controller('tasks')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createTask(@Body() task: any) {
    return this.appService.createTask(task)
  }

  @Get()
  async getTasks() {
    // for now empty here here we retrieve all tasks
    return []
  }
}
