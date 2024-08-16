import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Task } from '../entities/task.entity';
import { TaskService } from '../service/task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() task: Partial<Task>) {
    return this.taskService.createTask(task);
  }

  @Get()
  async getTasks() {
    return this.taskService.getTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(id);
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() updateData: Partial<Task>) {
    return this.taskService.updateTask(id, updateData);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
