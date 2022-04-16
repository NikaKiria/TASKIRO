import { IsNotEmpty, Matches, Length } from 'class-validator';

export class createGroupDto {
  @IsNotEmpty({ message: 'Group title must not be empty!' })
  @Length(3, 30, { message: 'Group title must be 3-30 characters long!' })
  @Matches('/[A-Za-zds]/g', undefined, {
    message: 'Group title must only contain alphanumeric and space characters!',
  })
  title: string;

  @IsNotEmpty({ message: 'Group description must not be empty!' })
  @Length(3, 30, { message: 'Group description must be 3-30 characters long!' })
  @Matches('/[A-Za-zds]/g', undefined, {
    message:
      'Group description must only contain alphanumeric and space characters!',
  })
  description: string;

  @IsNotEmpty({ message: 'Group must have members!' })
  members: Array<string>;

  @IsNotEmpty({ message: 'Group must have author!' })
  author: string;
}

export interface Group {
  title: string;
  description: string;
  members: Array<string>;
  author: string;
}
