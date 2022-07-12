import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(@Inject() private service: UserService) {}
  @Post()
  createUser(@Body() body) {
    return this.service.createUser(body);
  }
  @Delete()
  deleteUser(@Query() id) {
    return this.service.deleteUser(id);
  }
  @Put()
  updateUser(@Body() body) {
    return this.service.updateUser(body);
  }
  @Patch()
  updateUserPassword(@Body() body) {
    return this.service.updatePassword(body);
  }
  @Get()
  queryUsers() {
    return this.service.queryUsers();
  }
}
