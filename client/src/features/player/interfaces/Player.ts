import { NonsensicalScript } from "../../game/interfaces/Game";

export interface Player {
  id?: string;

  name: string;

  avatar: string;
};

export interface ClassicModePlayer extends Player{
  status: string;

  script: NonsensicalScript;

  score: number;

  votes: number;
}