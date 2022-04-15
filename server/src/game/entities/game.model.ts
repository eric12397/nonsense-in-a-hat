import { v4 as uuidv4 } from 'uuid';
import { Player } from 'src/player/entities/player.model';
import { NonsensicalScript } from './script.model';
import { GameAction } from '../actions/gameAction';
import { GameActionResponse, Status } from '../actions/gameActionResponse';

export class Game {
  public id: string;

  public name: string;

  public board: GameboardState;

  public players: Player[] = new Array<Player>();

  public host: Player;

  public maxPlayersAllowed: number;

  public gameMode: string;

  public isGameInProgress: boolean;

  public password: string;

  constructor(mode: GameboardState) {
    this.id = uuidv4();
    this.board = mode;
  }

  public joinGame = (player: Player): void => {
    this.players.push(player);
  };

  public leaveGame = (player: Player): void => {
    this.players = this.players.filter((p) => p.id !== player.id);
  };

  public executeAction(action: GameAction<GameboardState>): GameActionResponse {
    const error = action.isValid(this.board);

    if (error) {
      return new GameActionResponse(Status.Failure, error);
    }

    action.execute(this.board);
    return new GameActionResponse(Status.Success, null, this);
  }
}

export interface GameboardState {
  maxRounds: number;

  currentRound: number;

  howToPlay: string;

  initialize: (players: Player[]) => void;
}

export class ClassicMode implements GameboardState {
  public hat: NonsensicalScript[] = new Array<NonsensicalScript>();

  public players: PlayerState[] = new Array<PlayerState>();

  public winner: Player;

  public maxRounds: number;

  public currentRound: number;

  public howToPlay =
    'Please submit a script below. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';

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
