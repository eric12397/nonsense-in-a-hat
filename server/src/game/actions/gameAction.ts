import { ClassicMode, GameboardState } from '../entities/game.model';
import { NonsensicalScript } from '../entities/script.model';

export interface GameAction<T extends GameboardState> {
  execute: (state: T) => void;

  isValid: (state: T) => string;
}

export class SubmitScript implements GameAction<ClassicMode> {
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
