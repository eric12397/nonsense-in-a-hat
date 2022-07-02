import { Player } from 'src/player/entities/player.model';
import { ClassicMode, GameboardState } from '../entities/game.model';
import { NonsensicalScript } from '../entities/script.model';

export interface GameAction<T extends GameboardState> {
  execute: (state: T) => void;

  isValid: (state: T) => string;
}

export class SubmitScriptAction implements GameAction<ClassicMode> {
  constructor(private _script: NonsensicalScript, private _playerId: string) {}

  public execute = (state: ClassicMode): void => {
    state.hat.push(this._script);
  };

  public isValid = (state: ClassicMode): string => {
    let error = '';

    const { hat, maxRounds } = state;

    const playerScripts = hat.filter((script) => script.playerId === this._playerId).length;

    // player can only submit one script per round
    if (playerScripts > maxRounds) {
      error = 'You have exceeded the max number of scripts.';
    }

    return error;
  };
}

export class JoinGameAction implements GameAction<GameboardState> {
  constructor(private _newPlayer: Player) {}

  public execute = (state: GameboardState): void => {
    state.players.push(this._newPlayer);
  };

  public isValid = (state: GameboardState): string => {
    return '';
  };
}

export class LeaveGameAction implements GameAction<GameboardState> {
  constructor(private _newPlayer: Player) {}

  public execute = (state: GameboardState): void => {
    state.players = state.players.filter((p) => p.id !== this._newPlayer.id);
  };

  public isValid = (state: GameboardState): string => {
    return '';
  };
}

export class InitGameAction implements GameAction<GameboardState> {
  public execute = (state: GameboardState): void => {
    state.initialize();
  };

  public isValid = (state: GameboardState): string => {
    return '';
  };
}
