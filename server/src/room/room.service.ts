import { Injectable } from '@nestjs/common';
import { PlayerService } from 'src/player/player.service';
import { Room } from './entities/room.model';
import { RoomDTO } from './dto/room.dto';
import { Player } from 'src/player/player.model';

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

  public getAllRooms = (): RoomDTO[] => {
    const rooms = Array.from<Room>(this._rooms.values());

    return rooms.map((room) => {
      const { host, name, participants, maxPlayersAllowed, gameMode, isGameInProgress } = room;

      const roomDTO = new RoomDTO();
      roomDTO.host = host;
      roomDTO.name = name;
      roomDTO.currentPlayerCount = participants.length;
      roomDTO.maxPlayersAllowed = maxPlayersAllowed;
      roomDTO.gameMode = gameMode;
      roomDTO.isGameInProgress = isGameInProgress;

      return roomDTO;
    });
  };
}
