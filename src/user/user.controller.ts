import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { LoginUserDto } from './dto/LoginUser.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Post('register')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  registerUser(@Body() providedUserObject: CreateUserDto) {
    return this.UserService.createUser(providedUserObject);
  }

  @Post('login')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  loginUser(@Body() providedLoginObject: LoginUserDto) {
    return this.UserService.loginUser(providedLoginObject);
  }
}
