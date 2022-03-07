import { Injectable } from '@nestjs/common';
import { PlayerService } from 'src/player/player.service';
import { Room } from './entities/room.model';
import { RoomDTO } from './dto/room.dto';
import { CreateRoomDTO } from './dto/createRoom.dto';

@Injectable()
export class RoomService {
  private _rooms: Map<string, Room>;

  constructor(private readonly _playerService: PlayerService) {
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

  public createRoom = (roomData: CreateRoomDTO): Room => {
    const { name, password, hostId, maxPlayersAllowed } = roomData;

    const host = this._playerService.getPlayerById(hostId);

    const newRoom = new Room();
    newRoom.joinRoom(host);
    newRoom.name = name;
    newRoom.host = host;
    newRoom.maxPlayersAllowed = maxPlayersAllowed;
    newRoom.password = password;

    this._rooms.set(newRoom.id, newRoom);
    return newRoom;
  };
}
