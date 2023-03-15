import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const AQI_URL = 'https://api.waqi.info/feed/';
const token = '/?token=84ae272c2a6c1c6890572f398be954a05210aaed';

const cleanData = (apiData) => {
  const {
    aqi, idx, attributions, city,
  } = apiData.data;
  return {
    aqi, idx, attributions, city,
  };
};

const fetchAqi = createAsyncThunk('aqi/fetchAqi', async (city) => {
  const { data } = await (axios.get(`${AQI_URL}${city}${token}`));
  const cityData = cleanData(data);
  console.log(cityData);
  return cityData;
});

export default fetchAqi;
