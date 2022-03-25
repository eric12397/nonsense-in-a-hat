import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { MySocket } from './interfaces/mySocket';
import { GameGateway } from './game/game.gateway';

@WebSocketGateway({ cors: true })
export class ConnectionGateway implements OnGatewayDisconnect, OnGatewayConnection {
  constructor(private readonly _gameGateway: GameGateway) {}

  public handleDisconnect(@ConnectedSocket() client: MySocket) {
    console.log('Socket disconnected!');

    if (client.game != null) {
      this._gameGateway.leaveGame(client, client.game, client.player);
    }
  }

  public handleConnection(@ConnectedSocket() client: MySocket) {
    console.log('Socket connected!');
    client.player = client.handshake.auth.playerId;
  }
}
