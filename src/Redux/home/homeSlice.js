import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const AQI_URL = 'https://api.waqi.info/feed/';
const token = '/?token=84ae272c2a6c1c6890572f398be954a05210aaed';

const cleanData = (apiData) => {
  const {
    aqi, idx, attributions, time, city,
  } = apiData.data;
  return {
    aqi, idx, attributions, time, city,
  };
};

export const fetchAqi = createAsyncThunk('aqi/fetchAqi', async (city) => {
  const { data } = await (axios.get(`${AQI_URL}${city}${token}`));
  const citiesData = cleanData(data);
  return { ...citiesData, status: 'success' };
});

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

export const { reducer: homeReducer, extraReducers } = homeSlice;
