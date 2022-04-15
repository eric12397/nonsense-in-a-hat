import { Player } from "../../player/interfaces/Player";

export interface Game {
  id: string;

  name: string;

  board: GameBoard;

  players: Player[];

  host: Player;

  currentPlayerCount: number;

  maxPlayersAllowed: number;

  gameMode: string;

  isGameInProgress: boolean;
}

export interface GameBoard {
  hat: NonsensicalScript[];
  
  players: PlayerState[];

  maxRounds: number;

  currentRound: number;

  howToPlay: string;
}

export interface PlayerState {
  player: Player;

  status: string;

  script: NonsensicalScript;

  score: number;
  
  votes: number;
}

export interface NonsensicalScript {
  id: string;

  text: string;

  playerId: string;
}

