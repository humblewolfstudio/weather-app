import React, { createContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TemperatureTab from './components/TemperatureTab/TemperatureTab';
import TodayForecast from './components/TodayForecast/TodayForecast';
import { Forecast, ForecastContextInterface } from './types';
import WeekForecast from './components/WeekForecast/WeekForecast';

import chroma from 'chroma-js';

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

  useEffect(() => {
    if (!alreadyMadeRequest) {
      calculateBackgroundColorByHour();
      fetch("https://api.open-meteo.com/v1/forecast?latitude=41.392583&longitude=2.0001067&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m")
        .then((response) => response.json())
        .then((data: Forecast) => {
          setData(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
      alreadyMadeRequest = true;
    }
  })

  return (
    <div className="App">
      <div className="App-header">
        <ForecastContext.Provider value={{ data }}>
          <TemperatureTab />
          <TodayForecast />
          <WeekForecast />
        </ForecastContext.Provider>
      </div>
    </div>
  );
}

export default App;
