import axios from "axios"
import { CreateRoom } from "../interfaces/CreateRoom";
import { Room } from "../interfaces/Room";
import { VerifyRoom } from "../interfaces/VerifyRoom";

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

const verifyRoomPassword = async ({ roomId, password }: VerifyRoom): Promise<boolean> => {
  const url = `http://localhost:8000/rooms/${roomId}/verify`;

  const { data } = await axios.post(url, {password});
  return data;
}

export const roomAPI = {
  getRooms,
  createRoom,
  verifyRoomPassword
}