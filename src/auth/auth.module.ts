import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from 'src/utils/LocalStrategy';
import { RoomsService } from 'src/rooms/rooms.service';
import { UserService } from 'src/user/user.service';
import { RoomsRepository } from 'src/rooms/rooms.repository';
import { UserRepository } from 'src/user/user.repository';
import { SessionSerializer } from 'src/utils/serializer';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    RoomsService,
    UserService,
    LocalStrategy,
    RoomsRepository,
    UserRepository,
    LocalStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
