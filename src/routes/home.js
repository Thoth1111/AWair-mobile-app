import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchAqi from '../Redux/API/airData';
import '../styles/home.css';

const mainCities = [
  'Nairobi',
  'Beijing',
  'Sydney',
  'London',
  'Delhi',
  'Lagos',
  'New York',
  'Durban',
];

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPromises = mainCities.map((city) => dispatch(fetchAqi(city)));
    Promise.all(fetchPromises);
  }, [dispatch]);

  const cityData = useSelector((state) => {
    const cityArr = [];
    for (let i = 0; i < state.home.length; i += 1) {
      if (state.home[i]) {
        cityArr.push(state.home[i]);
      }
    }
    return cityArr;
  });

  return (
    <section>
      <span>Air Quality Index in a few Major Cities</span>
      <div>
        {cityData.map((city) => (
          <div key={city.idx}>
            <span className="city-name">{city.city.name}</span>
            <br />
            <span className="aqi-value">
              AQI (Air Quality Index):
              {' '}
              {city.aqi}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
