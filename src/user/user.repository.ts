import { Inject, Injectable } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class UserRepository {
  constructor(@Inject() private service: UserService) {}
  createUser() {}
  deleteUser() {}
  updateUser() {}
  queryUsers() {}
}
