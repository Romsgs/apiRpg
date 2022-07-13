import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ICreateRoomDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  master: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class IDeleteRoomDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}
export interface IQueryRooms {
  id: string;
  name: string;
  master: string;
  password: string;
}
