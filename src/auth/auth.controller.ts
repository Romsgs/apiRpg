import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ISignUpDto, ISignInDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private authService: AuthService) {}
  @Post('signup')
  signup(@Body() body: ISignUpDto) {
    return this.authService.signup(body);
  }
  @Post('signin')
  signin(@Body() body: ISignInDto) {
    return this.authService.signin(body);
  }
}
