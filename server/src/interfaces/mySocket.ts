import { Socket } from 'socket.io';

export interface MySocket extends Socket {
  room: string;
  player: string;
}
