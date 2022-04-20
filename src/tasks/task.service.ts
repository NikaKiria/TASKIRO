import {
  HttpException,
  Inject,
  Injectable,
  Param,
  Scope,
} from '@nestjs/common';
import { Task } from './dto/createTask.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as escapeHTML from 'escape-html';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async createTask(providedTaskObject: Task, params) {
    try {
      const assignee = escapeHTML(this.request.userEmail);
      const groupId = escapeHTML(params.groupId);
      const userAssignedTo = escapeHTML(params.memberId);
      const title = escapeHTML(providedTaskObject.title);
      const description = escapeHTML(providedTaskObject.description);
      // Create new object from cleaned data
      const newTaskObject = {
        assignee: assignee,
        userAssignedTo: userAssignedTo,
        groupId: groupId,
        title: title,
        description: description,
      };
      // Create new group
      const newTask = new this.taskModel(newTaskObject);
      if (!newTask) {
        throw new HttpException('Cant create new task!', 500);
      }
      const creationResult = await newTask.save();
      // Check if task has been created and return error if not
      const createdTaskObjectToReturn: object = {
        Message: 'task successfully created!',
        taskObject: creationResult['_doc'],
      };
      if (!creationResult) {
        throw new HttpException(
          'Something went wrong when creating task!',
          500,
        );
      }
      return createdTaskObjectToReturn;
    } catch (err) {
      console.log(err);
      throw new HttpException('Something went wrong!', 500);
    }
  }
}
