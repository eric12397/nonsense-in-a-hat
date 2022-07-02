import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { RootState } from './app/store';
import { io, Socket } from "socket.io-client";
import { removeGame, updateGame } from './features/game/gameSlice';
import { Game } from './features/game/interfaces/Game';
import { GameActionResponse, Status } from './features/game/interfaces/GameActionResponse';

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
        socket.on('joinGameResponse', (res: GameActionResponse) => {
          storeAPI.dispatch(updateGame(res.gameInstance));
        });

        socket.on('leaveGameResponse', (res: GameActionResponse) => {
          storeAPI.dispatch(updateGame(res.gameInstance));
        });

        socket.on('hostLeftGame', (gameId: string) => {
          storeAPI.dispatch(removeGame(gameId));
        });

        socket.on('submitScriptResponse', (res: GameActionResponse) => {
          storeAPI.dispatch(updateGame(res.gameInstance));
        });

        socket.on('startGameResponse', (res: GameActionResponse) => {
          storeAPI.dispatch(updateGame(res.gameInstance));
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
      case "games/submitScript": {
        socket.emit("submitScript", action.payload);
        break;
      }
      case "games/start": {
        socket.emit("startGame", action.payload);
        break;
      }
    }

    return next(action);
  }
}