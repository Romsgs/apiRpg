import { Module } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, UserRepository],
})
export class AuthModule {}
