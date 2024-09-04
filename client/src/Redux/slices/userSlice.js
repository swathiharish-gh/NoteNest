import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
      userData: null,
      isAuthenticated: false,
    },
    reducers: {
      setUserData: (state, action) => {
        console.log("Dispatching setUserData with payload:", action.payload); // Log the payload
        state.userData = action.payload;
        state.isAuthenticated = true;
      },
      removeUserData: (state) => {
        console.log("Dispatching removeUserData"); // Log when removing user data
        state.userData = null;
        state.isAuthenticated = false;
      },
    },
  });
  
  export const { setUserData, removeUserData } = userSlice.actions;
  export default userSlice.reducer;
  