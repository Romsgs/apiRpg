import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(@Inject() private repository: UserRepository) {}
  createUser() {}
  deleteUser() {}
  updateUser() {}
  queryUsers() {}
}
