import {
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Get,
} from '@nestjs/common';
import { createGroupDto } from './dto/createGroup.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GroupService } from './group.service';

@Controller('groups')
export class GroupController {
  constructor(private GroupService: GroupService) {}

  @Post('create-group')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  createGroup(@Body() providedGroupObject: createGroupDto) {
    return this.GroupService.createGroup(providedGroupObject);
  }

  @Get('my-groups')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  getMyGroups() {
    return this.GroupService.getUserGroups();
  }
}
