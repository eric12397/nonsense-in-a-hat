import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MySocket } from 'src/interfaces/mySocket';
import { GameActionResponse, Status } from './actions/gameActionResponse';
import { GameService } from './game.service';

@WebSocketGateway({ cors: true })
export class GameGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly _gameService: GameService) {}

  @SubscribeMessage('joinGame')
  public async joinGame(
    @ConnectedSocket() socket: MySocket,
    @MessageBody('gameId') gameId: string,
    @MessageBody('playerId') playerId: string,
  ): Promise<GameActionResponse> {
    const res = this._gameService.joinPlayerToGame(gameId, playerId);

    if (res.status === Status.Success) {
      socket.game = gameId;
      socket.join(gameId);
    }

    this.server.in(gameId).emit('joinGameResponse', res);
    return res;
  }

  @SubscribeMessage('leaveGame')
  public async leaveGame(
    @ConnectedSocket() socket: MySocket,
    @MessageBody('gameId') gameId: string,
    @MessageBody('playerId') playerId: string,
  ): Promise<void> {
    const res = this._gameService.removePlayerFromGame(gameId, playerId);
    socket.game = null;

    if (res.gameInstance && res.gameInstance.host.id === playerId) {
      // if host leaves, all other players have to leave
      socket.to(gameId).emit('hostLeftGame', gameId);
      this._gameService.deleteGame(gameId);
    } else {
      // otherwise, signal that a player left the game
      socket.to(gameId).emit('leaveGameResponse', res);
    }
  }

  @SubscribeMessage('submitScript')
  public async submitScript(
    @ConnectedSocket() socket: MySocket,
    @MessageBody('script') script: string,
  ): Promise<GameActionResponse> {
    const res = this._gameService.submitScript(socket.game, socket.player, script);

    this.server.in(socket.game).emit('submitScriptResponse', res);
    return res;
  }

  @SubscribeMessage('startGame')
  public async startGame(@ConnectedSocket() socket: MySocket): Promise<GameActionResponse> {
    const res = this._gameService.initializeGame(socket.game);

    this.server.in(socket.game).emit('startGameResponse', res);
    return res;
  }
}
