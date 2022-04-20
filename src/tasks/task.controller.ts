import {
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Param,
} from '@nestjs/common';
import { createTaskDto } from './dto/createTask.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TaskService } from './task.service';

@Controller('groups')
export class TaskController {
  constructor(private TaskService: TaskService) {}

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
