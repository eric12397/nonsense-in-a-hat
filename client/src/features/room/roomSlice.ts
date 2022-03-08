import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { roomAPI } from '../room/api'
import { CreateRoom, Room } from './interfaces'

// Define a type for the slice state
interface RoomState {
  rooms: Room[]
}

// Define the initial state using that type
const initialState: RoomState = {
  rooms: []
}

export const roomSlice = createSlice({
  name: 'rooms',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
    });

    builder.addCase(createRoom.fulfilled, (state, action: PayloadAction<Room>) => {
      state.rooms.push(action.payload);
    });
  }
})

// Async thunks
export const getRooms = createAsyncThunk(
  'rooms/fetch',
  async () => {
    const response = await roomAPI.getRooms();
    return response;
  }
)
 
export const createRoom = createAsyncThunk(
  'rooms/create',
  async (room: CreateRoom, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    room.hostId = state.auth.myPlayer?.id!;

    const response = await roomAPI.createRoom(room);
    return response;
  }
)

// Selectors
export const selectRooms = (state: RootState) => state.rooms.rooms;

export default roomSlice.reducer;