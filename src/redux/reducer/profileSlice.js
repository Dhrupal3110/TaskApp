import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initial state
const initialState = {
  profile: null,
  loading: false,
  error: null,
};

// Async thunk for fetching profile
export const fetchProfile = createAsyncThunk('profile/fetch', async (_, { rejectWithValue }) => {
  try {
    const profile = await AsyncStorage.getItem('user');
    return JSON.parse(profile);
  } catch (error) {
    return rejectWithValue('Failed to fetch profile');
  }
});

// Async thunk for updating profile
export const updateProfile = createAsyncThunk('profile/update', async (profileData, { rejectWithValue }) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(profileData));
    return profileData;
  } catch (error) {
    return rejectWithValue('Failed to update profile');
  }
});

// Profile slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      AsyncStorage.removeItem('userProfile');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
