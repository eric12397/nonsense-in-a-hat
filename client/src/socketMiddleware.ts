import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { RootState } from './app/store';
import { io, Socket } from "socket.io-client";
import { removeGame, updateGame } from './features/game/gameSlice';
import { Game } from './features/game/interfaces/Game';

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
        socket.on('joinGameSuccess', (data: Game) => {
          storeAPI.dispatch(updateGame(data));
        });

        socket.on('leaveGameSuccess', (data: Game) => {
          storeAPI.dispatch(updateGame(data));
        });

        socket.on('hostLeftGame', (gameId: string) => {
          storeAPI.dispatch(removeGame(gameId));
        });
        break;
      }
      case "games/join": {
        socket.emit("joinGame", action.payload);
        break;
      }
      case "games/leave": {
        socket.emit("leaveGame", action.payload);
        break;
      }
    }

    return next(action);
  }
}