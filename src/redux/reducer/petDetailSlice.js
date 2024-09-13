import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { petApi } from '../../api'; // Adjust the path as necessary

// Define the initial state
const initialState = {
  pet: null,
  loading: false,
  error: null,
};

// Define an async thunk for fetching pet details
export const fetchPetById = createAsyncThunk(
  'petDetail/fetchPetById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await petApi.getPetById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch pet details');
    }
  }
);

// Create the slice
const petDetailSlice = createSlice({
  name: 'petDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPetById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPetById.fulfilled, (state, action) => {
        state.loading = false;
        state.pet = action.payload;
      })
      .addCase(fetchPetById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default petDetailSlice.reducer;
