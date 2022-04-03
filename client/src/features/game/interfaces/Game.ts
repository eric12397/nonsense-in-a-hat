import { Player } from "../../player/interfaces/Player";

export interface Game {
  id: string;

  name: string;

  board: GameBoard;

  players: Player[];

  host: Player;

  maxRounds: number;

  currentPlayerCount: number;

  maxPlayersAllowed: number;

  gameMode: string;

  isGameInProgress: boolean;
}

export interface GameBoard {
  players: PlayerState[];

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

