import { Controller, Get } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomDTO } from './dto/room.dto';

@Controller()
export class RoomController {
  constructor(private readonly _roomService: RoomService) {}

  @Get('/rooms')
  public getRooms(): RoomDTO[] {
    return this._roomService.getAllRooms();
  }
}
