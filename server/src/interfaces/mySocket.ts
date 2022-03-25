import { Socket } from 'socket.io';

export interface MySocket extends Socket {
  game: string;
  player: string;
}
