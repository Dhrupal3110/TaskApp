import { createSlice } from '@reduxjs/toolkit';

// Initial state for the auth slice
const initialState = {
  token: null,      // No token initially
  userData: null,   // No user data initially
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to clear user data and token (logout)
    logout: (state) => {
      state.token = null;
      state.userData = null;
    },
    // Action to set the user profile data
    setUserProfileData: (state, action) => {
      state.userData = action.payload;
    },
    // Action to store the authentication token
    login: (state, action) => {
      state.token = action.payload;
    },
  },
});

// Export actions for use in components
export const { logout, setUserProfileData, login } = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;
