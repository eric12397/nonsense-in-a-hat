import { Injectable } from '@nestjs/common';
import { PlayerService } from 'src/player/player.service';
import { Game } from './entities/game.model';
import { GameDTO } from './dto/game.dto';
import { CreateGameDTO } from './dto/createGame.dto';
import { GameFactory } from './entities/gameFactory';
import { NonsensicalScript } from './entities/script.model';
import { InitGameAction, SubmitScriptAction } from './actions/gameAction';
import { GameActionResponse } from './actions/gameActionResponse';

@Injectable()
export class GameService {
  private _games: Map<string, Game>;

  constructor(private readonly _playerService: PlayerService) {
    this._games = new Map<string, Game>();
  }

  public getGameById = (gameId: string): Game => {
    return this._games.get(gameId);
  };

  public getAllGames = (): GameDTO[] => {
    const games = Array.from<Game>(this._games.values());

    return games.map((game) => {
      const { id, host, name, players, maxPlayersAllowed, gameMode, isGameInProgress } = game;

      const gameDTO = new GameDTO();
      gameDTO.id = id;
      gameDTO.host = host;
      gameDTO.name = name;
      gameDTO.currentPlayerCount = players.length;
      gameDTO.maxPlayersAllowed = maxPlayersAllowed;
      gameDTO.gameMode = gameMode;
      gameDTO.isGameInProgress = isGameInProgress;

      return gameDTO;
    });
  };

  public createGame = (gameData: CreateGameDTO): Game => {
    const { name, password, hostId, maxPlayersAllowed, rounds, mode } = gameData;

    const host = this._playerService.getPlayerById(hostId);

    const newGame = GameFactory.createGame(mode);
    newGame.name = name;
    newGame.host = host;
    newGame.maxPlayersAllowed = maxPlayersAllowed;
    newGame.password = password;
    newGame.board.maxRounds = rounds;
    newGame.gameMode = mode;

    this._games.set(newGame.id, newGame);
    return newGame;
  };

  public deleteGame = (gameId: string): string => {
    this._games.delete(gameId);
    return gameId;
  };

  public joinPlayerToGame = (gameId: string, playerId: string): Game => {
    const game = this.getGameById(gameId);
    const player = this._playerService.getPlayerById(playerId);

    game.joinGame(player);
    return game;
  };

  public removePlayerFromGame = (gameId: string, playerId: string): Game => {
    const game = this.getGameById(gameId);
    const player = this._playerService.getPlayerById(playerId);

    game.leaveGame(player);
    return game;
  };

  public submitScript = (gameId: string, playerId: string, text: string): GameActionResponse => {
    const script = new NonsensicalScript();
    script.playerId = playerId;
    script.text = text;

    const game = this.getGameById(gameId);
    return game.tryExecuteAction(new SubmitScriptAction(script, playerId));
  };

  public initializeGame = (gameId: string): GameActionResponse => {
    const game = this.getGameById(gameId);
    return game.tryExecuteAction(new InitGameAction(game.players));
  };
}
