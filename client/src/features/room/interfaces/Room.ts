import { Player } from "../../player/interfaces/Player";

export interface Room {
  id: string;

  name: string;

  host: any;

  participants: Player[];

  currentPlayerCount: number;

  maxPlayersAllowed: number;

  gameMode: string;

  isGameInProgress: boolean;
}
