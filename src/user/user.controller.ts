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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  @Get()
  queryUsers() {
    return this.service.queryUsers();
  }
}
