import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import TemperatureTab from './components/TemperatureTab/TemperatureTab';
import TodayForecast from './components/TodayForecast/TodayForecast';
import { Forecast, ForecastContextInterface } from './types';
import WeekForecast from './components/WeekForecast/WeekForecast';

import chroma from 'chroma-js';
import { useGeolocated } from 'react-geolocated';
import { nearestCity } from 'cityjs';

export const ForecastContext = createContext<ForecastContextInterface | null>(null);
const f = chroma.scale(['#1C2955ff', '#2F3B65ff', '#474F74ff', '#91C1D5ff', '#0077CBff', '#0077CBff', '#91C1D5ff', '#474F74ff', '#2F3B65ff', '#1C2955ff']);
var alreadyMadeRequest = false;

const setBackgroundColor = (color: string) => {
  document.documentElement.style.setProperty('--background-color', color);
}

const calculateBackgroundColorByHour = () => {
  var hour = new Date().getHours();
  var aux = (hour * 100) / 24 / 100;
  setBackgroundColor(f(aux).toString());
}

function App() {

  const [data, setData] = useState<Forecast>();
  const [cityName, setCity] = useState('');
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false
    },
    userDecisionTimeout: 5000,
  })

  useEffect(() => {
    if (!alreadyMadeRequest && coords != undefined) {
      calculateBackgroundColorByHour();
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords?.latitude}&longitude=${coords?.longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`)
        .then((response) => response.json())
        .then((data: Forecast) => {
          setData(data);
          const nearCity = nearestCity({ latitude: coords.latitude, longitude: coords.longitude });
          setCity(nearCity.name);
        })
        .catch((err) => {
          console.log(err.message);
        });
      alreadyMadeRequest = true;
    }
  })
  return isGeolocationAvailable ? (
    isGeolocationEnabled ? (

      <div className="App" >
        <div className="App-header">
          <ForecastContext.Provider value={{ data, cityName }}>
            <TemperatureTab />
            <TodayForecast />
            <WeekForecast />
          </ForecastContext.Provider>
        </div>
      </div >) : <div>Geolocation not enabled</div>
  ) : <div>Geolocation not available in your browser!</div>
}

export default App;
