import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { gameAPI } from './api'
import { CreateGame } from './interfaces/CreateGame'
import { AnyAction } from 'redux';
import { Game } from './interfaces/Game';
import { GameActionResponse, Status } from './interfaces/GameActionResponse';
import socketService from '../../common/SocketService';

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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getGames.fulfilled, (state, action: PayloadAction<Game[]>) => {
      state.games = action.payload;
    });

    builder.addCase(createGame.fulfilled, (state, action: PayloadAction<Game>) => {
      state.games.push(action.payload);
    });

    builder.addCase(joinGame.fulfilled, (state, action: PayloadAction<Game>) => {
      state.games = state.games.map(r => r.id === action.payload.id ? action.payload : r);
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

export const joinGame = createAsyncThunk(
  'games/join',
  async (gameId: string, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const playerId = state.auth.myPlayer?.id!;

    const res = await socketService.emit<GameActionResponse>("joinGame", { gameId, playerId });

    if (res.status === Status.Failure) {
      return rejectWithValue(res.message);
    }
    return res.gameInstance;
  }
)

export const leaveGame = createAsyncThunk(
  'games/leave',
  async (gameId: string, { getState }) => {
    const state = getState() as RootState;
    const playerId = state.auth.myPlayer?.id!;

    const res = await socketService.emit<GameActionResponse>("leaveGame", { gameId, playerId });
    return res.gameInstance;
  }
)

export const submitScript = createAsyncThunk(
  'games/submitScript',
  async (script: string, { rejectWithValue }) => {
    const res = await socketService.emit<GameActionResponse>("submitScript", { script });

    if (res.status === Status.Failure) {
      return rejectWithValue(res.message);
    }
    return res.gameInstance;
  }
)

export const startGame = createAsyncThunk(
  'games/start',
  async (gameId: string, { rejectWithValue }) => {
    const res = await socketService.emit<GameActionResponse>("startGame", { gameId });

    if (res.status === Status.Failure) {
      return rejectWithValue(res.message);
    }
    return res.gameInstance;
  }
)

export const { updateGame, removeGame, updateGameRemovedFlag } = gameSlice.actions

// Selectors
export const selectGames = (state: RootState) => state.games.games;
export const selectGameById = (state: RootState, id: string) => state.games.games.find(r => r.id === id);
export const selectGameRemovedFlag = (state: RootState) => state.games.isGameRemoved;

export default gameSlice.reducer;