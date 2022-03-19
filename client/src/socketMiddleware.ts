import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { RootState } from './app/store';
import { io, Socket } from "socket.io-client";
import { Room } from './features/room/interfaces';
import { updateRoom } from './features/room/roomSlice';

export const socketMiddleware: Middleware = (storeAPI: MiddlewareAPI<Dispatch<AnyAction>, RootState>) => {
  
  let socket: Socket;
  
  return next => (action: AnyAction) => {

    switch(action.type) {
      case "players/create/fulfilled" : {
        socket = io("http://localhost:8000", {
          auth: {
            playerId: action.payload.id
          },
        });
        
        // subscribe to listeners
        socket.on('joinRoomSuccess', (data: Room) => {
          storeAPI.dispatch(updateRoom(data));
        });

        socket.on('leaveRoomSuccess', (data: Room) => {
          storeAPI.dispatch(updateRoom(data));
        });
        break;
      }
      case "rooms/join": {
        socket.emit("joinRoom", action.payload);
        break;
      }
      case "rooms/leave": {
        socket.emit("leaveRoom", action.payload);
        break;
      }
    }

    return next(action);
  }
}