import { Inject, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { UserService } from 'src/user/user.service';
import { ISignInDto, ISignUpDto } from './dto';
@Injectable()
export class AuthService {
  constructor(@Inject(UserService) private userService: UserService) {}
  async signup(userData: ISignUpDto) {
    return await this.userService.createUser(userData);
  }

  async signin(userData: ISignInDto) {
    const targetUser = await this.userService.queryUsersByEmail(userData.email);
    if (!(await argon.verify(targetUser.password, userData.password))) {
      return null;
    }
    return 'I have signed Up';
  }
}
