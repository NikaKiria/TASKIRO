import {
  IsAlpha,
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Firstname must not be empty!' })
  @Length(3, 30, { message: 'Firstname must be 3-30 characters long!' })
  @IsAlpha(undefined, {
    message: 'Firstname can only contain alpha characters!',
  })
  firstname: string;

  @IsNotEmpty({ message: 'Lastname must not be empty!' })
  @Length(3, 30, { message: 'Lastname must be 3-30 characters long!' })
  @IsAlpha(undefined, {
    message: 'Lastname can only contain alpha characters!',
  })
  lastname: string;

  @IsNotEmpty({ message: 'Email must not be empty!' })
  @IsEmail({ message: 'Wrong Email!' })
  email: string;

  @IsNotEmpty({ message: 'Password must not be empty!' })
  @Length(3, 30, { message: 'Password must be 3-30 characters long!' })
  @IsAlphanumeric(undefined, {
    message: 'Password must only contain alphanumeric characters',
  })
  password: string;

  groups: Array<string>;

  @IsNotEmpty({ message: 'Profession must not be empty!' })
  @Length(3, 30, { message: 'Profession must be 3-30 characters long!' })
  @IsAlpha(undefined, {
    message: 'Profession can only contain alpha characters!',
  })
  profession: string;

  @IsNotEmpty({ message: 'Bio must not be empty!' })
  @Length(3, 300, { message: 'Bio must be 3-300 characters long!' })
  bio: string;
}
