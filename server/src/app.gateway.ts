import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { MySocket } from './interfaces/mySocket';
import { RoomGateway } from './room/room.gateway';

@WebSocketGateway({ cors: true })
export class ConnectionGateway implements OnGatewayDisconnect, OnGatewayConnection {
  constructor(private readonly _roomGateway: RoomGateway) {}

  public handleDisconnect(@ConnectedSocket() client: MySocket) {
    console.log('Socket disconnected!');

    if (client.room != null) {
      this._roomGateway.leaveRoom(client, client.room, client.player);
    }
  }

  public handleConnection(@ConnectedSocket() client: MySocket) {
    console.log('Socket connected!');
    client.player = client.handshake.auth.playerId;
  }
}
