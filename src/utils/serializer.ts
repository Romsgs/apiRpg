import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import logger from './logger';
@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(@Inject(UserService) private userService: UserService) {
    super();
  }
  serializeUser(user: any, done: (err, user: any) => void) {
    logger.info('SerializerUser');
    console.log(user);
    done(null, user);
  }
  async deserializeUser(payload: any, done: (err, user: any) => void) {
    logger.info('DeSerializerUser');
    const user = await this.userService.queryUsersById(payload.id);
    console.log(user);
    return user ? done(null, payload) : done(null, null);
  }
}
