import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { isNullOrUndefined } from 'util';
import { MySocket } from './interfaces/mySocket';
import { RoomService } from './room/room.service';

@WebSocketGateway({ cors: true })
export class ConnectionGateway implements OnGatewayDisconnect, OnGatewayConnection {
  constructor(private readonly _roomService: RoomService) {}

  public handleDisconnect(@ConnectedSocket() client: MySocket) {
    console.log('Socket disconnected!');

    if (client.room != null) {
      const room = this._roomService.removePlayerFromRoom(client.room, client.player);
      client.to(room.id).emit('leaveRoomSuccess', room);
    }
  }

  public handleConnection(@ConnectedSocket() client: MySocket) {
    console.log('Socket connected!');
    client.player = client.handshake.auth.playerId;
  }
}
