import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ForecastContext } from '../../App';
import { ForecastContextInterface, HourlyForecastInterface } from '../../types';
import HourlyForecast from '../HourlyForecast/HourlyForecast';
import './TodayForecast.css'

var madeForecast = false;

export default function TodayForecast() {

    const Context: ForecastContextInterface = useContext(ForecastContext)!;
    const [temperaturesHourly, setTemperaturesHourly] = useState<Array<HourlyForecastInterface>>([]);

    const todayForecastRef = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (madeForecast) return;
        var data = Context.data;
        if (data == undefined) return;
        console.log(data);
        var today = new Date();
        var div = todayForecastRef.current;
        var nElements = 24 - today.getHours();
        var temperatures = [];
        for (var i = 0; i < nElements; i++) {
            var hourlyForecast: HourlyForecastInterface = { time: '0h', temperature: '0º' };
            hourlyForecast!.time = (Number(today.getHours() + i).toString().length < 2 ? '0' + Number(today.getHours() + i) : Number(today.getHours() + i)) + 'h';
            hourlyForecast!.temperature = data.hourly.temperature_2m[Number(today.getHours() + i)] + 'º'
            temperatures.push(hourlyForecast!);
        }
        setTemperaturesHourly(temperatures);
        madeForecast = true;
    })

    return (
        <div className="today-forecast-content">
            <div className="top-text-wrapper">
                <label className='top-text'></label>
            </div>
            <div ref={todayForecastRef} className="forecast-wrapper">
                {temperaturesHourly.map(function (object, i) {
                    return <HourlyForecast time={object.time} temperature={object.temperature} />
                })}
            </div>
        </div>
    )
}