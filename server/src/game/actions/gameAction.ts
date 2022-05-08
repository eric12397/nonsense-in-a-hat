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

export class InitGameAction implements GameAction<GameboardState> {
  constructor(private _players: Player[]) {}

  public execute = (state: GameboardState): void => {
    state.initialize(this._players);
  };

  public isValid = (state: GameboardState): string => {
    return '';
  };
}
