import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(@Inject(UserRepository) private repository: UserRepository) {}
  createUser(body) {
    try {
      return this.repository.createUser(body);
    } catch (error) {}
  }
  deleteUser(id) {
    return this.repository.deleteUser(id);
  }
  updateUser(body) {
    return this.repository.updateUser(body);
  }
  queryUsers() {
    return this.repository.queryUsers();
  }
  updatePassword(body) {
    return this.repository.updatePassword(body);
  }
}
