import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stayeasyApi } from '../services/api';

export type UserRole = 'GUEST' | 'ADMIN' | null;

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    userId: number | null;
    fullName: string | null;
    role: UserRole;
    token: string | null;
  };
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    userId: null,
    fullName: null,
    role: null,
    token: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ userId: number; fullName: string; role: UserRole; token: string }>) => {
        state.isAuthenticated = true;
        state.user.userId = action.payload.userId;
        state.user.fullName = action.payload.fullName;
        state.user.role = action.payload.role;
        state.user.token = action.payload.token;
        localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = initialState.user;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        stayeasyApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          const { userId, fullName, role, token } = payload;
          state.isAuthenticated = true;
          state.user = { userId, fullName, role, token };
          localStorage.setItem('user', JSON.stringify({ userId, fullName, role, token }));
        }
      )
      .addMatcher(
        stayeasyApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
            const { userId, fullName, role, token } = payload;
            state.isAuthenticated = true;
            state.user = { userId, fullName, role, token };
            localStorage.setItem('user', JSON.stringify({ userId, fullName, role, token }));
        }
      );
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;