import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
@Injectable()
export class UserRepository {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}
  async createUser(userData) {
    try {
      userData.password = await argon.hash(userData.password);
      return await this.prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: userData.password,
        },
      });
    } catch (error) {
      throw new PrismaClientKnownRequestError(
        'prisma error',
        HttpStatus.INTERNAL_SERVER_ERROR.toString(),
        'v1',
      );
    }
  }
  async deleteUser(id) {
    try {
      return await this.prisma.user.delete({ where: { id: id } });
    } catch (error) {
      throw new HttpException(
        'id não encontrado',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updateUser(body) {
    try {
      const user = await this.prisma.user.update({
        where: { id: body.id },
        data: { name: body.name, email: body.email },
      });
      delete user.password;
      return user;
    } catch (error) {
      throw new HttpException('cant update', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async queryUsers() {
    try {
      return this.prisma.user.findMany();
    } catch (error) {
      throw new HttpException(
        'can reach Database',
        HttpStatus.FAILED_DEPENDENCY,
      );
    }
  }
  async updatePassword(body) {
    try {
      body.password = argon.hash(body.password);
      await this.prisma.user.update({
        where: { id: body.id },
        data: { password: body.password },
      });
      return 'OK';
    } catch (error) {
      throw new HttpException(
        'can reach Database',
        HttpStatus.FAILED_DEPENDENCY,
      );
    }
  }
}
