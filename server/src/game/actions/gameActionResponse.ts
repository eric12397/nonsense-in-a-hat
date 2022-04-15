import { Game } from '../entities/game.model';

export class GameActionResponse {
  public status: Status;

  public message?: string;

  public gameInstance?: Game;

  constructor(status: Status, message?: string, game?: Game) {
    this.status = status;
    this.message = message;
    this.gameInstance = game;
  }
}

export enum Status {
  Success,
  Failure,
}
