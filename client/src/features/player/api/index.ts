import axios from "axios"
import { Player } from "../interfaces/Player"

const createPlayer = async (player: Player): Promise<Player> => {
  const url = 'http://localhost:8000/players';

  const { data } = await axios.post(url, player)
  return data;
}

export const playerAPI = {
  createPlayer
}