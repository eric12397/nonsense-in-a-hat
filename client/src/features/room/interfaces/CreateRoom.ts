export interface CreateRoom {
  name: string;

  password: string;

  hostId: string;

  maxPlayersAllowed: number;

  rounds: number;

  mode: string;
}