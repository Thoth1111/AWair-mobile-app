import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAqi } from '../Redux/API/airData';
import '../styles/home.css';

const mainCities = [
'NewYork',
'Sao Paulo',
'London',
'Lagos',
'Delhi',
'Cairo',
'Nairobi',
'CapeTown',
'Beijing',
'Sydney',
];

const Home = () => {
    const dispatch = useDispatch();
    const fetchPromises = mainCities.map(city => dispatch(fetchAqi(city)));

    useEffect(() => {
        Promise.all(fetchPromises)
    }, []);

    const cityData =useSelector((state) => [
        state.home[0],
        state.home[1],
        state.home[2],
        state.home[3],
        state.home[4],
        state.home[5],
        state.home[6],
        state.home[7],
        state.home[8],
        state.home[9],
    ]);

  return (
    <section>
        <span>Air Quality Index in a few Major Cities</span>
        <div>
            {}
        </div>
    </section>
  )
};

export default Home;

