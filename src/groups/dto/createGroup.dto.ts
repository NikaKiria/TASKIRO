/* eslint-disable prettier/prettier */
import { IsNotEmpty, Length } from 'class-validator';

export class createGroupDto {
  @IsNotEmpty({ message: 'Group title must not be empty!' })
  @Length(3, 30, { message: 'Group title must be 3-30 characters long!' })
  title: string;

  @IsNotEmpty({ message: 'Group description must not be empty!' })
  @Length(3, 300, {
    message: 'Group description must be 3-300 characters long!',
  })
  description: string;

  @IsNotEmpty({ message: 'Group must have members!' })
  members: Array<string>;

  author: string;
}

export interface Group {
  title: string;
  description: string;
  members: Array<string>;
  author: string;
}
