import { Controller, Get, Post, Body } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomDTO } from './dto/room.dto';
import { Room } from './entities/room.model';
import { CreateRoomDTO } from './dto/createRoom.dto';

@Controller()
export class RoomController {
  constructor(private readonly _roomService: RoomService) {}

  @Get('/rooms')
  public getRooms(): RoomDTO[] {
    return this._roomService.getAllRooms();
  }

  @Post('/rooms')
  public createRoom(@Body() roomData: CreateRoomDTO): Room {
    return this._roomService.createRoom(roomData);
  }
}
