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
  Session,
} from '@nestjs/common';
import logger from 'src/utils/logger';
import { ICreateRoomDTO, IDeleteRoomDTO } from './dto';
import { RoomsService } from './rooms.service';
@Controller('room')
export class RoomsController {
  constructor(@Inject(RoomsService) private service: RoomsService) {}
  @Post()
  async createRoom(@Body() body: ICreateRoomDTO) {
    try {
      logger.info('dentro do controller');
      logger.info('this is body:', body);
      const CreatRoomBody = body as ICreateRoomDTO;
      logger.info(CreatRoomBody);

      logger.info('entregando isso ao service: ', CreatRoomBody);
      return this.service.makeRoom(CreatRoomBody);
    } catch (error) {
      throw new HttpException('cant create this room', HttpStatus.CONFLICT);
    }
  }
  @Delete()
  deleteRoom(@Query() id: IDeleteRoomDTO) {
    this.service.deleteRoom(id.id);
    return 'OK';
  }

  @Get()
  queryRoom(@Session() session: Record<string, any>) {
    if (session.authenticated) {
      try {
        return this.service.queryRooms();
      } catch (error) {
        throw new HttpException(
          'infernal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      return new HttpException('need to login', HttpStatus.UNAUTHORIZED);
    }
  }
}
