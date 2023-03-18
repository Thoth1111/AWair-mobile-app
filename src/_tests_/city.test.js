import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import City from '../routes/city';
import { homeReducer } from '../Redux/home/homeSlice';

const newCity = {
  idx: 1,
  aqi: 42,
  city: {
    name: 'Test City',
    geo: [1.234, 4.567],
    url: 'https://example.com/testcity',
  },
  time: {
    tz: '+1',
    s: '2022-03-18 21:30:00',
  },
  attributions: [
    {
      name: 'Test Attribution',
      url: 'https://example.com/testattribution',
    },
  ],
  status: 'success',
};

const initialState = {
  home: [newCity],
};

const store = configureStore({
  reducer: homeReducer,
  preloadedState: initialState,
});

test('renders city details if newCity has AQI', () => {
  const { container } = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/cityname']}>
        <City />
      </MemoryRouter>
    </Provider>,
  );

  const cityName = container.querySelector('.city-name');
  expect(cityName).toHaveTextContent('Test City');

  const aqiValue = container.querySelector('.aqi-value-0-50');
  expect(aqiValue).toHaveTextContent('42');

  const timeZone = container.querySelector('.details:nth-child(3)');
  expect(timeZone).toHaveTextContent('TimeZone: GMT-+1');

  const moreInfoLink = container.querySelector('.details:nth-child(4) a');
  expect(moreInfoLink).toHaveTextContent('Test City');
  expect(moreInfoLink).toHaveAttribute('href', 'https://example.com/testcity');

  const attributionName = container.querySelector('.details:nth-child(5)');
  expect(attributionName).toHaveTextContent('Test Attribution');

  const chart = container.querySelector('.chart');
  expect(chart).toBeInTheDocument();
});

// import React from 'react';
// import { render } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
// import City from '../routes/city';
// import { homeReducer } from '../Redux/home/homeSlice';

// const mockStore = configureStore([]);

// test('renders city details if newCity has AQI', () => {
//   const newCity = {
//     idx: 1,
//     aqi: 42,
//     city: {
//       name: 'Test City',
//       geo: [1.234, 4.567],
//       url: 'https://example.com/testcity',
//     },
//     time: {
//       tz: '+1',
//       s: '2022-03-18 21:30:00',
//     },
//     attributions: [
//       {
//         name: 'Test Attribution',
//         url: 'https://example.com/testattribution',
//       },
//     ],
//     status: 'success',
//   };

//   const mockState = {
//     home: [newCity],
//   }

//   const store = mockStore(mockState);

//   const { container } = render(
//     <Provider store={store}>
//       <MemoryRouter initialEntries={['/cityname']}>
//         <City />
//       </MemoryRouter>
//     </Provider>
//   );

//   const cityName = container.querySelector('.city-name');
//   expect(cityName).toHaveTextContent('Test City');

//   // Assertion for AQI value
//   const aqiValue = container.querySelector('.aqi-value-0-50');
//   expect(aqiValue).toHaveTextContent('42');

//   // Assertion for time zone
//   const timeZone = container.querySelector('.details:nth-child(3)');
//   expect(timeZone).toHaveTextContent('GMT+1');

//   // Assertion for city URL in more info link
//   const moreInfoLink = container.querySelector('.details:nth-child(4) a');
//   expect(moreInfoLink).toHaveTextContent('Test City');
//   expect(moreInfoLink).toHaveAttribute('href', 'https://example.com/testcity');

//   // Assertion for attribution name
//   const attributionName = container.querySelector('.details:nth-child(5)');
//   expect(attributionName).toHaveTextContent('Test Attribution');

//   // Assertion for chart
//   const chart = container.querySelector('.chart');
//   expect(chart).toBeInTheDocument();
// });
