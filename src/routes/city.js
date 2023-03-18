import React, { useEffect } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { GoGlobe } from 'react-icons/go';
import { fetchAqi } from '../Redux/home/homeSlice';
import '../styles/city.css';

const City = () => {
  const { cityname } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newCity = useSelector((state) => {
    const latestCity = state.home[state.home.length - 1];
    return latestCity && latestCity.status === 'success' ? latestCity : null;
  });

  const handleReturn = () => {
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    dispatch(fetchAqi(cityname));
  }, [cityname, dispatch]);

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

  let content;

  if (!newCity.aqi) {
    content = (
      <div className="error-window">
        <p className="load-error">
          Sorry. No Stats found for
          {' '}
          {cityname}
          . Please try a different city or hit the back button.
        </p>
      </div>
    );
  } else {
    const aqiClass = getAqiClass(newCity.aqi);
    content = (
      <div key={newCity.idx} className="city-page">

        <div className="top-container">
          <div>
            <GoGlobe className="globe" />
          </div>
          <div className="aqi-cont">
            <span className="city-name">{newCity.city.name}</span>
            <span className={`${aqiClass}`}>
              {newCity.aqi}
            </span>
            <span className="time-stamp">
              Last Station Update Time:
              {'  '}
              <br />
              {newCity.time.s}
            </span>
          </div>
        </div>
        <span className="mid-container">Station & Reading Details</span>
        <div className="lower-container">
          <div className="attributions">
            <span className="details">
              Long:
              {'   '}
              {newCity.city.geo[0]}
            </span>
            <span className="details">
              Lat:
              {'   '}
              {newCity.city.geo[1]}
            </span>
            <span className="details">
              TimeZone:
              {'   '}
              {' '}
              GMT-
              {newCity.time.tz}
            </span>
            <span className="details">
              More on
              {'   '}
              <a target="_blank" href={newCity.city.url} rel="noreferrer">{newCity.city.name}</a>
              {'   '}
              station
              {}
            </span>
            <span className="details">
              Attribution:
              <br />
              {newCity.attributions.map((tribute) => (
                <p key={newCity.idx}>
                  name:
                  {' '}
                  {tribute.name}
                  {' '}
                  <br />
                  <a target="_blank" href={tribute.url} rel="noreferrer">Visit</a>
                  <hr className="separator" />
                </p>
              ))}
            </span>
          </div>
          <div className="chart">
            <table>
              <tbody>
                <tr>
                  <th>AQI </th>
                  <th>Air Pollution Level</th>
                </tr>
                <tr className="aqi-value-0-50">
                  <td>0 - 50</td>
                  <td>Good</td>
                </tr>
                <tr className="aqi-value-51-100">
                  <td>50 - 100</td>
                  <td>Moderate</td>
                </tr>
                <tr className="aqi-value-101-150">
                  <td>101 - 150</td>
                  <td>Unhealthy for Sensitive Groups</td>
                </tr>
                <tr className="aqi-value-151-200">
                  <td>151 - 200</td>
                  <td>Unhealthy</td>
                </tr>
                <tr className="aqi-value-201-300">
                  <td>201 - 300</td>
                  <td>Very Unhealthy</td>
                </tr>
                <tr className="aqi-value-300-500">
                  <td>Above 300</td>
                  <td>Hazardous</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
