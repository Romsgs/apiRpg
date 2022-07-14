import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { IQueryUsers } from 'src/user/dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    console.log('inside LocalStrategy.validate');
    console.log(username, password);
    const user: IQueryUsers = await this.authService.validateUser(
      username,
      password,
    );
    if (!user) {
      throw new HttpException(
        'what are you doing? Calling the FBI...',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
