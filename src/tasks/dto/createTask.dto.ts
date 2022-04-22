import { IsNotEmpty, Length } from 'class-validator';

export class createTaskDto {
  @IsNotEmpty({ message: 'Task title must not be empty!' })
  @Length(3, 40, { message: 'Task title must be 3-40 characters long!' })
  title: string;

  @IsNotEmpty({ message: 'Task description must not be empty!' })
  @Length(3, 300, {
    message: 'Task description must be 3-300 characters long!',
  })
  description: string;
}

export interface Task {
  title: string;
  description: string;
}

export interface taskFromDB {
  id: string;
  assignee: string;
  userAssignedTo: string;
  groupId: string;
  title: string;
  description: string;
  status: string;
  __v: number;
}
