import { createSlice } from "@reduxjs/toolkit";

interface adminState {
  Admin: {
    status: boolean;
  };
}

const initialState: adminState = {
  Admin: {
    status: false,
  },
};

const adminAuthSlice = createSlice({
  name: "admin",
  initialState: initialState,

  reducers: {
    adminlogin: (state) => {
      state.Admin = {
        status: true,
      };
    },

    adminlogout: (state) => {
      state.Admin = {
        status: false,
      };
    },
  },
});

export const { adminlogin, adminlogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
