import { ClassicMode, GameBoard } from '../entities/game.model';
import { NonsensicalScript } from '../entities/script.model';

export interface GameAction<T extends GameBoard> {
  execute: (state: T) => void;
}

export class SubmitScript implements GameAction<ClassicMode> {
  constructor(public script: NonsensicalScript) {}

  public execute = (state: ClassicMode) => {
    state.hat.push(this.script);
  };
}
