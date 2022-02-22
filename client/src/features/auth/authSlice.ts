import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { Player } from '../player/interfaces/Player'
import { playerAPI } from '../player/api'

// Define a type for the slice state
interface AuthState {
  myPlayer: Player | null,
  isLoggedIn: boolean
}

// Define the initial state using that type
const initialState: AuthState = {
  myPlayer: null,
  isLoggedIn: false
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAsGuest.fulfilled, (state, action: PayloadAction<Player>) => {
      state.myPlayer = action.payload;
      state.isLoggedIn = true;
    });
  }
})

// Async thunks
export const loginAsGuest = createAsyncThunk(
  'players/create',
  async (newPlayer: Player) => {
    const response = await playerAPI.createPlayer(newPlayer);
    return response;
  }
)

// Selectors
export const selectMyPlayer = (state: RootState) => state.auth.myPlayer!;

export default authSlice.reducer;