import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Simulated API calls
const simulateApiCall = (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userData);
    }, 1000);
  });
};

// Initial state
const initialState = {
  user: null,
  loading: false,
  isLogin: false,
  error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await simulateApiCall(credentials); // Replace with actual API call
    await AsyncStorage.setItem('user', JSON.stringify(response));
    return response;
  } catch (error) {
    return rejectWithValue('Login failed');
  }
});

// Async thunk for registration
export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await simulateApiCall(userData); // Replace with actual API call
    await AsyncStorage.setItem('user', JSON.stringify(response));
    return response;
  } catch (error) {
    return rejectWithValue('Registration failed');
  }
});

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLogin = false;
      state.error = null; // Clear any existing errors on logout
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogin = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Thunk action for logout
export const performLogout = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem('user');
    dispatch(authSlice.actions.logout());
  } catch (error) {
    console.error('Logout failed', error);
    // Handle error if necessary
  }
};

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
