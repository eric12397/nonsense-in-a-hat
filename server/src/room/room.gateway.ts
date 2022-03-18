import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from './room.service';

@WebSocketGateway({ cors: true })
export class RoomGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly _roomService: RoomService) {}

  @SubscribeMessage('joinRoom')
  public async joinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody('roomId') roomId: string,
    @MessageBody('playerId') playerId: string,
  ) {
    console.log('Socket joined room!');
    const room = this._roomService.joinPlayerToRoom(roomId, playerId);

    socket.join(room.id);
    this.server.in(room.id).emit('joinRoomSuccess', room);
    return room;
  }
}
