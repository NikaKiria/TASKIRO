import {
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Param,
  Put,
  Get,
} from '@nestjs/common';
import { createTaskDto } from './dto/createTask.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TaskService } from './task.service';

@Controller('groups')
export class TaskController {
  constructor(private TaskService: TaskService) {}

  @Put('/change-task-status/:groupId/:taskId')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  changeStatus(@Param() params: string[]) {
    return this.TaskService.changeTaskStatus(params);
  }

  @Get('/:groupId/tasks')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  getAllTasksInGroup(@Param() param: string) {
    return this.TaskService.getAllTasks(param);
  }

  @Post(':groupId/:memberId')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  createGroup(
    @Body() providedTaskObject: createTaskDto,
    @Param() params: string[],
  ) {
    return this.TaskService.createTask(providedTaskObject, params);
  }
}
