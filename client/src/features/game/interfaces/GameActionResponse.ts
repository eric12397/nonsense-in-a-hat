import { Game } from "./Game";

export interface GameActionResponse {
  status: Status;

  message: string;

  gameInstance: Game;
}

export enum Status {
  Success,
  Failure,
}