import axios from "axios"
import { CreateRoom, Room } from "../interfaces";

const getRooms = async (): Promise<Room[]> => {
  const url = 'http://localhost:8000/rooms';

  const { data } = await axios.get(url);
  return data;
}

const createRoom = async (room: CreateRoom): Promise<Room> => {
  const url = 'http://localhost:8000/rooms';

  const { data } = await axios.post(url, room);
  return data;
}

export const roomAPI = {
  getRooms,
  createRoom
}