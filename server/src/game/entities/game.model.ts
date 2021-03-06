import { v4 as uuidv4 } from 'uuid';
import { ClassicModePlayer, Player } from 'src/player/entities/player.model';
import { NonsensicalScript } from './script.model';
import { GameAction } from '../actions/gameAction';
import { GameActionResponse, Status } from '../actions/gameActionResponse';

export class Game {
  public id: string;

  public name: string;

  public board: GameboardState;

  public host: Player;

  public maxPlayersAllowed: number;

  public gameMode: string;

  public isGameInProgress: boolean;

  public password: string;

  constructor(mode: GameboardState) {
    this.id = uuidv4();
    this.board = mode;
  }

  public tryExecuteAction(action: GameAction<GameboardState>): GameActionResponse {
    const error = action.isValid(this.board);

    if (error) {
      return new GameActionResponse(Status.Failure, error);
    }

    action.execute(this.board);
    return new GameActionResponse(Status.Success, null, this);
  }
}

export interface GameboardState {
  // Each game mode implements GameboardState with their own logic/rules.
  maxRounds: number;

  currentRound: number;

  howToPlay: string;

  players: Player[];

  initialize: () => void;
}

export class ClassicMode implements GameboardState {
  public hat: NonsensicalScript[] = new Array<NonsensicalScript>();

  public players: ClassicModePlayer[] = new Array<ClassicModePlayer>();

  public winner: Player;

  public maxRounds: number;

  public currentRound: number;

  public howToPlay =
    'Please submit a script below. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';

  public initialize = () => {
    // Choose player at random to go first
    const randomPlayer = this.players[Math.floor(Math.random() * this.players.length)];

    this.players.forEach((p) => {
      p.score = 0;
      p.votes = 0;
      p.status = p.id === randomPlayer.id ? 'Active' : 'Waiting';
    });

    this.players.find((p) => p.status === 'Active').script = this.selectRandomScript();

    this.currentRound = 1;
  };

  private selectRandomScript = (): NonsensicalScript => {
    // Shuffle hat before popping off script
    for (let i = this.hat.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.hat[i], this.hat[j]] = [this.hat[j], this.hat[i]];
    }

    return this.hat.pop();
  };
}
