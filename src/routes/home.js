import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SiApacheairflow } from 'react-icons/si';
import { VscArrowCircleRight } from 'react-icons/vsc';
import { MdPlace } from 'react-icons/md';
import fetchAqi from '../Redux/apiFilter';
import '../styles/home.css';

const mainCities = [
  'Lima',
  'Helsinki',
  'Paris',
  'Berlin',
  'London',
  'New York',
  'Zurich',
  'Los Angeles',
  'Accra',
];

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleRedirect = (cityname) => {
    navigate(`/city/${cityname}`);
  };

  const getAqiClass = (aqi) => {
    if (aqi >= 0 && aqi <= 50) {
      return 'aqi-value-0-50';
    } if (aqi >= 51 && aqi <= 100) {
      return 'aqi-value-51-100';
    } if (aqi >= 101 && aqi <= 150) {
      return 'aqi-value-101-150';
    } if (aqi >= 151 && aqi <= 200) {
      return 'aqi-value-151-200';
    } if (aqi >= 201 && aqi <= 300) {
      return 'aqi-value-201-300';
    }
    return 'aqi-value-300-500';
  };

  return (
    <section>
      <div id="home-intro">Air Quality Index in a few Major Cities</div>
      <div className="cities-container">
        {cityData.map((city) => {
          const aqiClass = getAqiClass(city.aqi);
          return (
            <div className="main-city" key={city.idx}>
              <MdPlace className="pin" />
              <span className="city-name">{city.city.name}</span>
              <button
                type="button"
                className="check-btn"
                onClick={() => handleRedirect(city.city.name)}
              >
                <VscArrowCircleRight classname="arrow-btn" />
              </button>
              <div className="aqi-container">
                <SiApacheairflow className="wind-logo" />
                <span className="aqi-key">
                  AQI:
                </span>
                <span className={`${aqiClass}`}>
                  {city.aqi}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Home;
