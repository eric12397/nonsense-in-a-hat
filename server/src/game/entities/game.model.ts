import { v4 as uuidv4 } from 'uuid';
import { Player } from 'src/player/entities/player.model';
import { NonsensicalScript } from './script.model';
import { GameAction } from '../actions';

export class Game {
  public id: string;

  public name: string;

  public board: GameBoard;

  public players: Player[] = new Array<Player>();

  public host: Player;

  public maxPlayersAllowed: number;

  public maxRounds: number;

  public gameMode: string;

  public isGameInProgress: boolean;

  public password: string;

  constructor(mode: GameBoard) {
    this.id = uuidv4();
    this.board = mode;
  }

  public joinGame = (player: Player): void => {
    this.players.push(player);
  };

  public leaveGame = (player: Player): void => {
    this.players = this.players.filter((p) => p.id !== player.id);
  };

  public executeAction(action: GameAction<GameBoard>) {
    action.execute(this.board);
  }
}

export abstract class GameBoard {
  abstract howToPlay: string;

  abstract initialize: (players: Player[]) => void;
}

export class ClassicMode implements GameBoard {
  public hat: NonsensicalScript[] = new Array<NonsensicalScript>();

  public players: PlayerState[] = new Array<PlayerState>();

  public winner: Player;

  public currentRound: number;

  public howToPlay = 'Please submit a script below.';

  public initialize = (players: Player[]) => {
    this.players = players.map((p) => {
      const state = new PlayerState();
      state.player = p;
      state.status = 'Waiting';
      return state;
    });

    this.currentRound = 1;
  };
}

export class PlayerState {
  public player: Player;
  public status: string;
  public script: NonsensicalScript;
  public score: number;
  public votes: number;
}
