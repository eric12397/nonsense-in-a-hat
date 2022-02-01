import { Controller, Get } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller()
export class RoomController {
  constructor(private readonly _roomService: RoomService) {}

  @Get('/rooms')
  public getRooms() {
    return this._roomService.getAllRooms();
  }
}
