import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
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
}
