import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Query,
} from '@nestjs/common';
import logger from 'src/utils/logger';
import { ICreateRoomDTO, IDeleteRoomDTO } from './dto';
import { RoomsService } from './rooms.service';
@Controller('room')
export class RoomsController {
  constructor(@Inject(RoomsService) private service: RoomsService) {}
  @Post()
  createRoom(@Body() body: ICreateRoomDTO) {
    try {
      logger.info('entregando isso ao service: ', body);
      return this.service.makeRoom(body);
    } catch (error) {
      throw new HttpException('cant create this room', HttpStatus.CONFLICT);
    }
  }
  @Delete()
  deleteRoom(@Query() id: IDeleteRoomDTO) {
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
