import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon from 'argon2';
import logger from 'src/utils/logger';
@Injectable()
export class AuthService {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.queryUsersAuth(username);
    if (!user) {
      throw new HttpException('404', HttpStatus.NOT_FOUND);
    }
    if (!argon.verify(user.password, password)) {
      logger.fatal('password issue');
      return null;
    }
    console.table(user);
    return user;
  }
}
