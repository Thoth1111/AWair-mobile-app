import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';

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
        <span>air</span>
      </h1>
      <form>
        <label htmlFor="cityname">
          Enter City Name
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
            id="cityname"
            onClick={handleSubmit}
          >
            <BiSearchAlt />
          </button>
        </label>
      </form>
      {/* {error && <p>{error}</p>} */}
    </nav>
  );
};

export default Navbar;
