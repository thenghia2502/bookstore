/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
  },
  reducers: {
    loginSuccess(state, action) {
      state.userData = action.payload;
    },
    logout(state) {
      state.userData = null;
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export const selectUserData = (state) => state.user.userData;
export default userSlice.reducer;