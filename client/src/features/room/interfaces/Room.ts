export interface Room {
  id: string;

  name: string;

  host: any;

  currentPlayerCount: number;

  maxPlayersAllowed: number;

  gameMode: string;

  isGameInProgress: boolean;
};