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
import {
  ICreateUserDTO,
  IDeleteUserDTO,
  IUpdatePassDTO,
  IUpdateUserDTO,
} from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private service: UserService) {}
  // @Post()
  // async createUser(@Body() body: ICreateUserDTO) {
  //   const newUser: ICreateUserDTO = await this.service.createUser(body);
  //   delete newUser.password;
  //   return newUser;
  // }
  @Delete()
  deleteUser(@Query() id: IDeleteUserDTO) {
    this.service.deleteUser(id.id);
    return 'OK';
  }
  @Put()
  updateUser(@Body() body: IUpdateUserDTO) {
    return this.service.updateUser(body);
  }
  @Patch()
  updateUserPassword(@Body() body: IUpdatePassDTO) {
    return this.service.updatePassword(body);
  }
  @Get()
  queryUsers() {
    return this.service.queryUsers();
  }
}
