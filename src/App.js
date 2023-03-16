import React from 'react';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import Home from './routes/home';
import City from './routes/city';
import Navbar from './components/navbar';

const App = () => (
  <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city/:cityname" element={<City />} />
      </Routes>
    </Router>
  </>
);

export default App;
