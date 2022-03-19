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
    console.log('Socket joined room!');
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
    console.log('Socket left room!');
    const room = this._roomService.removePlayerFromRoom(roomId, playerId);

    socket.room = null;
    socket.to(room.id).emit('leaveRoomSuccess', room);
  }
}
