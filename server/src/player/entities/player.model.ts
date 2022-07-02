import { NonsensicalScript } from 'src/game/entities/script.model';
import { v4 as uuidv4 } from 'uuid';

export class Player {
  public id: string;

  public name: string;

  public avatar: string;

  constructor() {
    this.id = uuidv4();
  }
}

export class ClassicModePlayer extends Player {
  public status: string;

  public script: NonsensicalScript;

  public score: number;

  public votes: number;
}
