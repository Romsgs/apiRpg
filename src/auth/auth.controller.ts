import {
  Body,
  Controller,
  Inject,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/utils/local-guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private authService: AuthService) {}
  // @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Body() body: any) {
    console.log(body);
    this.authService.validateUser(body.name, body.password);
    console.log('logged');
  }

  async signup(@Session() session: Record<string, any>) {
    session.authentication = true;
  }
}
