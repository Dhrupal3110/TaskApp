import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

// Initial state
const initialState = {
  user: null,
  loading: false,
  isLogin: false,
  error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  const { email, password } = credentials;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await AsyncStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    return rejectWithValue(error.message || 'Login failed');
  }
});

// Async thunk for registration
export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  const { email, password } = userData;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await AsyncStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    return rejectWithValue(error.message || 'Registration failed');
  }
});

// Async thunk for checking authentication status on app load
export const checkAuthStatus = createAsyncThunk('auth/checkAuthStatus', async (_, { rejectWithValue }) => {
  try {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  } catch (error) {
    return rejectWithValue('Failed to check auth status');
  }
});

// Async thunk for logging out
export const performLogout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await signOut(auth);
    await AsyncStorage.removeItem('user');
    return null;
  } catch (error) {
    return rejectWithValue('Logout failed');
  }
});

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLogin = false;
      state.error = null; // Clear any existing errors on logout
    },
  },
  extraReducers: (builder) => {
    builder
      // Login actions
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

      // Registration actions
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogin = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Check Auth Status actions
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.isLogin = true;
          state.user = action.payload;
        }
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout actions
      .addCase(performLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(performLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isLogin = false;
      })
      .addCase(performLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Thunk action for loading user from AsyncStorage on app start
export const loadUserFromStorage = () => async (dispatch) => {
  try {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      dispatch(authSlice.actions.setUser(JSON.parse(user)));
    }
  } catch (error) {
    console.error('Failed to load user from storage', error);
  }
};

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
