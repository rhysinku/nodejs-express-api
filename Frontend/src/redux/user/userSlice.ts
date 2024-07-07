import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
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
  currentUser: UserData;
}

const initialState: UserState = {
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
      state.currentUser = null;
      state.loading = true;
    },
    signInSuccess: (state, action: PayloadAction<AccountTypes>) => {
      const { currentUser } = action.payload;
      state.currentUser = currentUser;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
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
