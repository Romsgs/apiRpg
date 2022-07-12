import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
    delete room.password;
    return room;
  }
  async deleteRoom(roomId) {
    return await this.prisma.room.delete({ where: { id: roomId } });
  }
  async queryRooms() {
    const allRooms = await this.prisma.room.findMany();
    console.log(allRooms);
    return allRooms;
  }
}
