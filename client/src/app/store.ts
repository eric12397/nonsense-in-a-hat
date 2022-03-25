import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import gamesReducer from '../features/game/gameSlice';
import { socketMiddleware } from '../socketMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    games: gamesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch