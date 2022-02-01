import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ConnectionGateway implements OnGatewayDisconnect, OnGatewayConnection {
  public handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('Socket disconnected!');
  }

  public handleConnection(@ConnectedSocket() client: Socket) {
    console.log('Socket connected!');
  }
}
