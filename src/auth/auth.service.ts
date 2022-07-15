import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { use } from 'passport';
import { UserService } from 'src/user/user.service';
import { ISignInDto, ISignUpDto } from './dto';
@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(JwtService) private jwt: JwtService,
  ) {}
  async signup(userData: ISignUpDto) {
    return await this.userService.createUser(userData);
  }

  async signin(userData: ISignInDto) {
    const targetUser = await this.userService.queryUsersByEmail(userData.email);
    if (!(await argon.verify(targetUser.password, userData.password))) {
      return null;
    }
    return this.signToken(targetUser.id, targetUser.email);
  }

  async signToken(userId: string, email: string) {
    const data = {
      sub: userId,
      email,
    };
    return {
      access_token: await this.jwt.signAsync(data, {
        expiresIn: '15m',
        secret: 'OASNDFLJKNVLOAKIDFMWIOF',
      }),
    };
  }
}
