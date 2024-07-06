import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string | null;
  currentuUser: UserData | null;
  loading: boolean;
  error: string | boolean;
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

interface AccountTypes {
  token: string;
  currentuUser: UserData;
}

const initialState: UserState = {
  token: null,
  currentuUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.token = null;
      state.currentuUser = null;
      state.loading = true;
    },
    signInSuccess: (state, action: PayloadAction<AccountTypes>) => {
      const { token, currentuUser } = action.payload;
      state.token = token;
      state.currentuUser = currentuUser;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.token = null;
      state.currentuUser = null;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signInFailure, signInStart, signInSuccess } = userSlice.actions;
export default userSlice.reducer;
