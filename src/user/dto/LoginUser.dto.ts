import { IsAlphanumeric, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'Email must not be empty!' })
  @IsEmail({ message: 'Wrong email format!' })
  email: string;

  @IsNotEmpty({ message: 'Password must not be empty!' })
  @Length(3, 30, { message: 'Password must be 3-30 characters long!' })
  @IsAlphanumeric(undefined, {
    message: 'Password must only contain alphanumeric characters',
  })
  password: string;
}

export interface loginObject {
  email: string;
  password: string;
}
