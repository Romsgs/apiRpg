import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
@Controller('room')
export class RoomsController {
  constructor(private service: RoomsService) {}
  @Post()
  createRoom(@Body() body: any) {
    try {
      return this.service.makeRoom(body);
    } catch (error) {
      throw new HttpException('cant create this room', HttpStatus.CONFLICT);
    }
  }
  @Delete()
  deleteRoom(@Query() id) {
    try {
      return this.service.deleteRoom(id);
    } catch (error) {
      throw new HttpException('not found', HttpStatus.CONFLICT);
    }
  }
  @Get()
  queryRoom() {
    try {
      return this.service.queryRooms();
    } catch (error) {
      throw new HttpException(
        'infernal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
