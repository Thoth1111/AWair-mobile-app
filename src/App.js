import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './routes/home';
import City from './routes/city';
import Nav from './components/navbar';

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/city" element={<City />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
