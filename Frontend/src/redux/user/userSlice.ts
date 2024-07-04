import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  currentUser: UserData | null;
  loading: boolean;
  error: string | boolean;
  counter: number;
}

interface UserData {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: false,
  counter: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.currentUser = null
      state.loading = true;
    },
    signInSuccess: (state, action: PayloadAction<UserData>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.currentUser = null
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signInFailure, signInStart, signInSuccess } = userSlice.actions;
export default userSlice.reducer;
