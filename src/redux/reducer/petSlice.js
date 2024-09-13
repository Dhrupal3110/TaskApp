// src/store/slices/petSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { petApi } from '../../api';
import { filterUniquePets } from '../../utils/functions';

// Async thunk to fetch pets data
export const fetchPets = createAsyncThunk('pets/fetchPets', async (_, { rejectWithValue }) => {
    try {
        const response = await petApi.findPetsByStatus(['available', 'pending', 'sold']);
        const filteredPets = filterUniquePets(response.data); // Apply the filter
        return filteredPets;
    } catch (error) {
        return rejectWithValue(error.response.data || 'An error occurred');
    }
});

// Create the slice
const petSlice = createSlice({
    name: 'pets',
    initialState: {
        pets: [],
        loading: false,
        error: null,
    },
    reducers: {
        // Add any non-async reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPets.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPets.fulfilled, (state, action) => {
                state.loading = false;
                state.pets = action.payload;
            })
            .addCase(fetchPets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default petSlice.reducer;
