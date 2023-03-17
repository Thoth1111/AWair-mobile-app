import React, { useEffect } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAqi } from '../Redux/home/homeSlice';

const City = () => {
  const { cityname } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newCity = useSelector((state) => {
    const latestCity = state.home[state.home.length - 1];
    console.log(latestCity);
    return latestCity && latestCity.status === 'success' ? latestCity : null;
  });

  const handleReturn = () => {
    navigate('/');
  };

  useEffect(() => {
    dispatch(fetchAqi(cityname));
  }, [cityname, dispatch]);

  let content;

  if (!newCity.aqi) {
    content = (
      <span className="load-error">
        Sorry. No Stats found for
        {' '}
        {cityname}
        . Please try again.
      </span>
    );
  } else {
    content = (
      <div key={newCity.idx}>
        <span className="city-name">{newCity.city.name}</span>
        <br />
        <span className="aqi-value">
          AQI (Air Quality Index):
          {' '}
          {newCity.aqi}
        </span>
        <br />
        <span>{newCity.attributions.url}</span>
      </div>
    );
  }
  return (
    <div>
      <button
        type="button"
        className="bck-btn"
        onClick={handleReturn}
      >
        <BiChevronLeft id="bck-chevron" />
      </button>
      <div>{content}</div>
    </div>
  );
};

export default City;
