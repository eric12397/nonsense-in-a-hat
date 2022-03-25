import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { gameAPI } from './api'
import { CreateGame } from './interfaces/CreateGame'
import { AnyAction } from 'redux';
import { Game } from './interfaces/Game';

// Define a type for the slice state
interface GamesState {
  games: Game[],
  isGameRemoved: boolean;
}

// Define the initial state using that type
const initialState: GamesState = {
  games: [],
  isGameRemoved: false,
}

export const gameSlice = createSlice({
  name: 'games',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateGame: (state, action: PayloadAction<Game>) => {
      state.games = state.games.map(r => r.id === action.payload.id ? action.payload : r);
    },
    updateGameRemovedFlag: (state, action: PayloadAction<boolean>) => {
      state.isGameRemoved = action.payload;
    },
    removeGame: (state, action: PayloadAction<string>) => {
      state.isGameRemoved = true;
      state.games = state.games.filter(r => r.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGames.fulfilled, (state, action: PayloadAction<Game[]>) => {
      state.games = action.payload;
    });

    builder.addCase(createGame.fulfilled, (state, action: PayloadAction<Game>) => {
      state.games.push(action.payload);
    });
  }
})

// Async thunks
export const getGames = createAsyncThunk(
  'games/fetch',
  async () => {
    const response = await gameAPI.getGames();
    return response;
  }
)
 
export const createGame = createAsyncThunk(
  'games/create',
  async (game: CreateGame, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    game.hostId = state.auth.myPlayer?.id!;

    const response = await gameAPI.createGame(game);
    return response;
  }
)

export const { updateGame, removeGame, updateGameRemovedFlag } = gameSlice.actions

// Selectors
export const selectGames = (state: RootState) => state.games.games;
export const selectGameById = (state: RootState, id: string) => state.games.games.find(r => r.id === id);
export const selectGameRemovedFlag = (state: RootState) => state.games.isGameRemoved;

// Action creators
export const joinGame = (gameId: string, playerId: string): AnyAction => ({
  type: "games/join",
  payload: { gameId, playerId }
});

export const leaveGame = (gameId: string, playerId: string): AnyAction => ({
  type: "games/leave",
  payload: { gameId, playerId }
});

export default gameSlice.reducer;