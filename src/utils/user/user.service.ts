import { HttpException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as argon from 'argon2';
import { IQueryUsers, IUpdateUserDTO } from './dto';
@Injectable()
export class UserService {
  constructor(@Inject(UserRepository) private repository: UserRepository) {}
  async createUser(body) {
    body.password = await argon.hash(body.password);
    return this.repository.createUser(body);
  }
  deleteUser(id) {
    return this.repository.deleteUser(id);
  }
  async updateUser(body: IUpdateUserDTO) {
    return this.repository.updateUser(body);
  }
  queryUsers() {
    const allUsers: any = this.repository.queryUsers();
    allUsers.forEach((room, i) => {
      delete allUsers[i].password;
    });

    return allUsers;
  }
  async updatePassword(body) {
    body.password = await argon.hash(body.password);
    return this.repository.updatePassword(body);
  }
}
