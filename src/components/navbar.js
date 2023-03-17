import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';
import '../styles/navbar.css';

const Navbar = () => {
  const [cityname, setCityName] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setCityName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (cityname) {
      navigate(`/city/${cityname}`);
    }
    setCityName('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && cityname) {
      event.preventDefault();
      navigate(`/city/${cityname}`);
    }
  };

  return (
    <nav>
      <h1>
        AW
        <span id="air-txt">~air</span>
      </h1>
      <span id="description-txt">Global Real-time Air Quality index.</span>
      <form className="form-section" onSubmit={handleSubmit}>
        <label htmlFor="cityname">
          <input
            id="cityname"
            name="cityname"
            type="text"
            placeholder="Enter City Name"
            value={cityname}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            id="sub-btn"
          >
            <BiSearchAlt className="search-icon" />
          </button>
        </label>
      </form>
    </nav>
  );
};

export default Navbar;
