import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import logger from 'src/utils/logger';
import { IQueryRooms } from './dto';
@Injectable()
export class RoomsRepository {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}
  async createRoom(roomConfig) {
    const room = await this.prisma.room.create({
      data: {
        name: roomConfig.name,
        master: roomConfig.master,
        password: roomConfig.password,
      },
    });
    logger.info(room);
    delete room.password;
    logger.info(room);
    return room;
  }
  async deleteRoom(roomId) {
    try {
      return await this.prisma.room.delete({ where: { id: roomId } });
    } catch (error) {
      throw new HttpException('id not found', HttpStatus.NOT_FOUND);
    }
  }
  async queryRooms(): Promise<Array<IQueryRooms>> {
    return await this.prisma.room.findMany();
  }
}
