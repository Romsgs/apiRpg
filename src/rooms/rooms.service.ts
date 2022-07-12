import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RoomsRepository } from './rooms.repository';
import argon from 'argon2';
@Injectable()
export class RoomsService {
  constructor(@Inject(RoomsRepository) private repository: RoomsRepository) {}
  makeRoom(data) {
    try {
      console.log('password', data.password);
      data.password = argon.hash(data.password);
      console.log(data.password);
      return this.repository.createRoom(data);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'cant create room no repository',
        HttpStatus.CONFLICT,
      );
    }
  }
  deleteRoom(roomId) {
    try {
      this.repository.deleteRoom(roomId);
    } catch (error) {
      throw new HttpException(
        'not possible to delete this room',
        HttpStatus.CONFLICT,
      );
    }
  }
  queryRooms() {
    return this.repository.queryRooms();
  }
}
