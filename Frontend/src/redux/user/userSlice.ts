import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string | null;
  currentUser: UserData | null;
  loading: boolean;
  error: string | boolean;
  updateLoading: boolean;
  updateError: string | null;
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
  token: string | null;
  currentUser: UserData;
}

const initialState: UserState = {
  token: null,
  currentUser: null,
  loading: false,
  error: false,
  updateLoading: false,
  updateError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.token = '';
      state.currentUser = null;
      state.loading = true;
    },
    signInSuccess: (state, action: PayloadAction<AccountTypes>) => {
      const { token, currentUser } = action.payload;
      state.currentUser = currentUser;
      state.token = token;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.token = '';
      state.currentUser = null;
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart: (state) => {
      state.updateLoading = true;
      state.updateError = null;
    },
    updateUserSuccess: (state, action: PayloadAction<UserData>) => {
      state.currentUser = action.payload;
      state.updateLoading = false;
      state.updateError = null;
    },
    updateUserFailed: (state, action) => {
      state.updateLoading = false;
      state.updateError = action.payload;
    },
  },
});

export const {
  signInFailure,
  signInStart,
  signInSuccess,
  updateUserStart,
  updateUserSuccess,
  updateUserFailed,
} = userSlice.actions;
export default userSlice.reducer;
