import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { roomAPI } from '../room/api'
import { CreateRoom, Room } from './interfaces'
import { AnyAction } from 'redux';

// Define a type for the slice state
interface RoomsState {
  rooms: Room[]
}

// Define the initial state using that type
const initialState: RoomsState = {
  rooms: []
}

export const roomSlice = createSlice({
  name: 'rooms',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateRoom: (state, action: PayloadAction<Room>) => {
      state.rooms = state.rooms.map(r => r.id === action.payload.id ? action.payload : r);
    }
  },
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

export const { updateRoom } = roomSlice.actions

// Selectors
export const selectRooms = (state: RootState) => state.rooms.rooms;
export const selectRoomById = (state: RootState, id: string) => state.rooms.rooms.find(r => r.id === id); 

// Action creators
export const joinRoom = (roomId: string, playerId: string): AnyAction => ({
  type: "rooms/join",
  payload: { roomId, playerId }
});

export const leaveRoom = (roomId: string, playerId: string): AnyAction => ({
  type: "rooms/leave",
  payload: { roomId, playerId }
});

export default roomSlice.reducer;