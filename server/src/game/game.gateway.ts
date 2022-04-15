import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MySocket } from 'src/interfaces/mySocket';
import { GameActionResponse } from './actions/gameActionResponse';
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
  ) {
    const game = this._gameService.joinPlayerToGame(gameId, playerId);
    socket.game = gameId;
    socket.join(game.id);
    this.server.in(game.id).emit('joinGameSuccess', game);
  }

  @SubscribeMessage('leaveGame')
  public async leaveGame(
    @ConnectedSocket() socket: MySocket,
    @MessageBody('gameId') gameId: string,
    @MessageBody('playerId') playerId: string,
  ) {
    const game = this._gameService.removePlayerFromGame(gameId, playerId);
    socket.game = null;

    if (game.host.id === playerId) {
      // if host leaves, all other players have to leave
      socket.to(game.id).emit('hostLeftGame', gameId);
    } else if (game.players.length === 0) {
      // have to wait for last player to leave before deleting game
      this._gameService.deleteGame(game.id);
    } else {
      // otherwise, signal that a player left the game
      socket.to(game.id).emit('leaveGameSuccess', game);
    }
  }

  @SubscribeMessage('submitScript')
  public async submitScript(
    @ConnectedSocket() socket: MySocket,
    @MessageBody('script') script: string,
  ): Promise<void> {
    const res = this._gameService.submitScript(socket.game, socket.player, script);
    this.server.in(socket.game).emit('submitScriptResponse', res);
  }
}
