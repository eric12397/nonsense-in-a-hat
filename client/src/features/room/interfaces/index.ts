export interface Room {
  id: string;

  name: string;

  host: any;

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
}