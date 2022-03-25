import axios from "axios"
import { CreateGame } from "../interfaces/CreateGame";
import { Game } from "../interfaces/Game";
import { VerifyGame } from "../interfaces/VerifyGame";

const getGames = async (): Promise<Game[]> => {
  const url = 'http://localhost:8000/games';

  const { data } = await axios.get(url);
  return data;
}

const createGame = async (game: CreateGame): Promise<Game> => {
  const url = 'http://localhost:8000/games';

  const { data } = await axios.post(url, game);
  return data;
}

const verifyGamePassword = async ({ gameId, password }: VerifyGame): Promise<boolean> => {
  const url = `http://localhost:8000/games/${gameId}/verify`;

  const { data } = await axios.post(url, {password});
  return data;
}

export const gameAPI = {
  getGames,
  createGame,
  verifyGamePassword
}