import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import Home from '../routes/home';

const mockStore = configureStore([thunk]);

describe('Home Page', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      home: [
        {
          aqi: 36,
          idx: 300,
          city: {
            name: 'Test City',
          },
        },
      ],
    });
  });

  it('renders the correct aqi', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>,
    );

    const city = screen.getByText('Test City');
    expect(city).toBeInTheDocument();

    const aqiData = screen.getByText('36');
    expect(aqiData).toBeInTheDocument();
  });
});
