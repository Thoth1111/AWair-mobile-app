import { createSlice } from '@reduxjs/toolkit';
import fetchAqi from '../API/airData';

const initialState = [];

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAqi.fulfilled, (state, action) => [...state, action.payload]);
  },
});

export default homeSlice.reducer;
