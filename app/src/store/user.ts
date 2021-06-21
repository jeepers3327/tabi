import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  nickname: string;
  token: string;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: UserState = {
  id: "",
  nickname: "",
  token: "",
  isAuthenticated: false,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setFetchingStart: (state) => {
      state.isLoading = true;
    },
    setFetchingEnd: (state) => {
      state.isLoading = false;
    },
    setUserData: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.nickname = action.payload.nickname;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    setAuthenticationFailed: (state) => {
      state.isAuthenticated = false;
    },
    removeUserData: (state) => {
      state.id = "";
      state.nickname = "";
      state.token = "";
      state.isAuthenticated = false;
    },
  },
});

export const {
  removeUserData,
  setUserData,
  setFetchingStart,
  setFetchingEnd,
  setAuthenticationFailed,
} = userSlice.actions;
