import { Inject, Injectable } from '@nestjs/common';
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
    console.log('inside repository', roomId);

    return await this.prisma.room.delete({ where: { id: roomId } });
  }
  async queryRooms(): Promise<Array<IQueryRooms>> {
    return await this.prisma.room.findMany();
  }
}
