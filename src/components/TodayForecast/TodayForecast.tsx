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
        if (data === undefined) return;
        var today = new Date();
        var nElements = 24;
        var temperatures = [];
        for (var i = 0; i < nElements; i++) {
            var hourlyForecast: HourlyForecastInterface = { time: '0h', temperature: '0º' };
            var hora = today.getHours() + i;
            if (hora > 23) hora -= 24;
            hourlyForecast!.time = (hora.toString().length < 2 ? '0' + hora : hora) + 'h';
            hourlyForecast!.temperature = data.hourly.temperature_2m[Number(today.getHours() + i)] + 'º'
            temperatures.push(hourlyForecast!);
        }
        setTemperaturesHourly(temperatures);
        madeForecast = true;
    }, [])

    return (
        <div className="today-forecast-content">
            <div className="title-wrapper">
                <label>Today Forecast</label>
            </div>
            <div ref={todayForecastRef} className="today-forecast-wrapper">
                {temperaturesHourly.map(function (object, i) {
                    return <HourlyForecast key={i} time={object.time} temperature={object.temperature} />
                })}
            </div>
        </div>
    )
}