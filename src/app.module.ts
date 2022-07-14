import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { RoomsModule } from './rooms/rooms.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    RoomsModule,
    UserModule,
    PassportModule.register({ session: true }),
    AuthModule,
  ],
})
export class AppModule {}
