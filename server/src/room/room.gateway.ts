import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MySocket } from 'src/interfaces/mySocket';
import { RoomService } from './room.service';

@WebSocketGateway({ cors: true })
export class RoomGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly _roomService: RoomService) {}

  @SubscribeMessage('joinRoom')
  public async joinRoom(
    @ConnectedSocket() socket: MySocket,
    @MessageBody('roomId') roomId: string,
    @MessageBody('playerId') playerId: string,
  ) {
    const room = this._roomService.joinPlayerToRoom(roomId, playerId);
    socket.room = roomId;
    socket.join(room.id);
    this.server.in(room.id).emit('joinRoomSuccess', room);
  }

  @SubscribeMessage('leaveRoom')
  public async leaveRoom(
    @ConnectedSocket() socket: MySocket,
    @MessageBody('roomId') roomId: string,
    @MessageBody('playerId') playerId: string,
  ) {
    const room = this._roomService.removePlayerFromRoom(roomId, playerId);
    socket.room = null;

    if (room.host.id === playerId) {
      // if host leaves, all other players have to leave
      socket.to(room.id).emit('hostLeftRoom', roomId);
    } else if (room.participants.length === 0) {
      // have to wait for last player to leave before deleting room
      this._roomService.deleteRoom(room.id);
    } else {
      // otherwise, signal that a player left the room
      socket.to(room.id).emit('leaveRoomSuccess', room);
    }
  }
}
