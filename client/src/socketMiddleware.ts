import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { RootState } from './app/store';
import { removeGame, updateGame } from './features/game/gameSlice';
import { GameActionResponse, Status } from './features/game/interfaces/GameActionResponse';
import socketService from './common/SocketService';

export const socketMiddleware: Middleware = (storeAPI: MiddlewareAPI<Dispatch<AnyAction>, RootState>) => {
  
  return next => (action: AnyAction) => {

    switch(action.type) {
      case "players/create/fulfilled" : {
        socketService.connect(action.payload.id);
         
        // subscribe to listeners
        socketService.on('joinGameResponse', (res: GameActionResponse) => {
          if (res.status === Status.Success) {
            storeAPI.dispatch(updateGame(res.gameInstance));
          } else {

          }
        });

        socketService.on('leaveGameResponse', (res: GameActionResponse) => {
          storeAPI.dispatch(updateGame(res.gameInstance));
        });

        socketService.on('hostLeftGame', (gameId: string) => {
          storeAPI.dispatch(removeGame(gameId));
        });

        socketService.on('submitScriptResponse', (res: GameActionResponse) => {
          if (res.status === Status.Success) {
            storeAPI.dispatch(updateGame(res.gameInstance));
          } else {

          }
        });

        socketService.on('startGameResponse', (res: GameActionResponse) => {
          storeAPI.dispatch(updateGame(res.gameInstance));
        });
        break;
      }
    }

    return next(action);
  }
}