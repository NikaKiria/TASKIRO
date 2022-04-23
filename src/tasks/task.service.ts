import {
  HttpException,
  Inject,
  Injectable,
  Param,
  Scope,
} from '@nestjs/common';
import { Task, taskFromDB } from './dto/createTask.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as escapeHTML from 'escape-html';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Group } from 'src/groups/dto/createGroup.dto';

@Injectable({ scope: Scope.REQUEST })
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>,
    @InjectModel('Group') private readonly groupModel: Model<Group>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  // Function that creates new task
  async createTask(providedTaskObject: Task, params: any) {
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

  // Function that changes task status
  async changeTaskStatus(params: any) {
    try {
      const groupId = escapeHTML(params.groupId);
      const taskId = escapeHTML(params.taskId);
      const user = this.request.userEmail;
      // Check if user is in group
      const fetchedGroup = await this.groupModel.findById(groupId);
      if (!fetchedGroup.members.includes(user)) {
        throw new HttpException('You are not a member of group!', 400);
      }
      // Check if task is in group
      const fetchedTask: taskFromDB = await this.taskModel.findById(taskId);
      if (fetchedTask.groupId !== groupId) {
        throw new HttpException('Bad request', 400);
      }
      // Check if task is assigned to user requesting change
      if (fetchedTask.userAssignedTo !== user) {
        throw new HttpException('Task is not assigned to you!', 400);
      }
      // Change task status
      const message = 'Successfully changed status!';
      if (fetchedTask.status === 'Unfinished') {
        const changingResult = await this.taskModel.findByIdAndUpdate(taskId, {
          status: 'Finished',
        });
        if (!changingResult) {
          throw new HttpException('Cant change status!', 500);
        }
      } else if (fetchedTask.status === 'Finished') {
        const changingResult = await this.taskModel.findByIdAndUpdate(taskId, {
          status: 'Unfinished',
        });
        if (!changingResult) {
          throw new HttpException('Cant change status!', 500);
        }
      }
      return message;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Something went wrong when changing task status!',
        500,
      );
    }
  }

  // Get all tasks in group
  async getAllTasks(param: any) {
    try {
      const groupId = escapeHTML(param.groupId);
      const user = this.request.userEmail;
      // Get group from db
      const fetchedGroup = await this.groupModel.findById(groupId);
      if (!fetchedGroup) {
        throw new HttpException('Group cant be found!', 500);
      }
      // Check if user is member of group
      if (!fetchedGroup.members.includes(user)) {
        throw new HttpException('You are not a member of the group!', 400);
      }
      // Fetch tasks from db
      const fetchedTasks = await this.taskModel.find({ groupId: groupId });
      if (!fetchedTasks) {
        throw new HttpException('Cant get tasks!', 500);
      }
      return fetchedTasks;
    } catch (err) {
      console.log(err);
      throw new HttpException('Something went wrong when fetching tasks', 500);
    }
  }

  // Get users tasks in group
  async getMyTasks(param: any) {
    try {
      const groupId = escapeHTML(param.groupId);
      const user = this.request.userEmail;
      // Get tasks
      const fetchedTasks = await this.taskModel.find({
        groupId: groupId,
        userAssignedTo: user,
      });
      if (fetchedTasks.length === 0) {
        throw new HttpException('Cant fetch any tasks', 500);
      }
      return fetchedTasks;
    } catch (err) {
      console.log(err);
      throw new HttpException(err.response, 500);
    }
  }
}
