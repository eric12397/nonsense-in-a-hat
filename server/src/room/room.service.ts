import { Injectable } from '@nestjs/common';
import { PlayerService } from 'src/player/player.service';
import { Room } from './room.model';

@Injectable()
export class RoomService {
  private _rooms: Map<string, Room>;
  private _playerService: PlayerService;

  constructor() {
    this._rooms = new Map<string, Room>();
  }

  public getRoomById = (roomId: string): Room => {
    return this._rooms.get(roomId);
  };

  public getAllRooms = (): Room[] => {
    return Array.from<Room>(this._rooms.values());
  };
}
