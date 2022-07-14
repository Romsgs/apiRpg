import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { RoomsModule } from './rooms/rooms.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    RoomsModule,
    UserModule,
    AuthModule,
    PassportModule.register({ session: true }),
  ],
})
export class AppModule {}
