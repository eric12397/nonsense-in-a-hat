import { Player } from "../../player/interfaces/Player";

export interface Room {
  id: string;

  name: string;

  host: any;

  participants: Player[]

  currentPlayerCount: number;

  maxPlayersAllowed: number;

  gameMode: string;

  isGameInProgress: boolean;
};

export interface CreateRoom {
  name: string;

  password: string;

  hostId: string;

  maxPlayersAllowed: number;

  rounds: number;

  mode: string;
}