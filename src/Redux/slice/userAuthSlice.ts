import { createSlice } from "@reduxjs/toolkit";

interface userState {
  userStatus: boolean;
  userData: {
    id: string | null;
  };
}

const initialState: userState = {
  userStatus: false,
  userData: {
    id: null,
  },
};

const userAuthSlice = createSlice({
  name: "users",
  initialState: initialState,

  reducers: {
    login: (state, action) => {
      state.userStatus = true;
      state.userData = {
        id: action.payload,
      };
    },

    logout: (state) => {
      state.userStatus = false;
      state.userData = {
        id: null,
      };
    },
  },
});

export const { login, logout } = userAuthSlice.actions;
export default userAuthSlice.reducer;
