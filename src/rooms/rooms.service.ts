import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RoomsRepository } from './rooms.repository';
import * as argon from 'argon2';
import logger from 'src/utils/logger';
import { IQueryRooms } from './dto';
@Injectable()
export class RoomsService {
  constructor(@Inject(RoomsRepository) private repository: RoomsRepository) {}
  async makeRoom(data) {
    try {
      const newRoom = data;
      logger.warn('dentro do server');
      console.log('password', newRoom.password);
      const hash = await argon.hash(newRoom.password);
      newRoom.password = hash;
      console.log(newRoom.password);
      return this.repository.createRoom(newRoom);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'cant create room no repository',
        HttpStatus.CONFLICT,
      );
    }
  }
  deleteRoom(roomId) {
    this.repository.deleteRoom(roomId);
  }
  async queryRooms() {
    const allRooms: any = await this.repository.queryRooms();
    allRooms.forEach((room, i) => {
      delete allRooms[i].password;
    });
    console.log(allRooms);
    return allRooms;
  }
}
