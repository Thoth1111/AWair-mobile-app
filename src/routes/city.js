import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAqi } from '../Redux/home/homeSlice';

const City = () => {
  const { cityname } = useParams();
  console.log(cityname);
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchAqi(cityname));
    console.log('Fetch initiated');
  }, [cityname, dispatch]);

  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && (
      <div key={data.idx}>
        <span className="city-name">{data.city.name}</span>
        <br />
        <span className="aqi-value">
          AQI (Air Quality Index):
          {' '}
          {data.aqi}
        </span>
        <br />
        <span>{data.attributions.url}</span>
      </div>
      )}
      {status === 'failed' && <p>Failed to load data</p>}
    </div>
  );
};

export default City;
