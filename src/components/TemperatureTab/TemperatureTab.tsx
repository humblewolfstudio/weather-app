import { useContext, useEffect, useState } from 'react'
import { ForecastContext } from '../../App';
import { ForecastContextInterface } from '../../types';
import './TemperatureTab.css'

export default function TemperatureTab() {
    const [maxTemperature, setMaxTemperature] = useState(10);
    const [minTemperature, setMinTemperature] = useState(0);
    const [temperature, setTemperature] = useState(0);

    const Context: ForecastContextInterface = useContext(ForecastContext)!;

    useEffect(() => {
        var data = Context.data;
        if (data == undefined) return;

        setTemperature(data.current_weather.temperature);

        /*SEARCH BY HOURS AND DATES
        for (var i in data!.hourly.time) {
            var date = new Date(data!.hourly.time[i]);

            if (date.getDate() != now.getDate()) continue;
            if (date.getHours() != now.getHours()) continue;

            setTemperature(data.hourly.temperature_2m[i]);
        }*/
    })

    return (
        <div className='temperature-content'>
            <div className="location-wrapper">
                <label className='location'>Barcelona</label>
            </div>
            <div className="temperature-wrapper">
                <label className='temperature'>{temperature}º</label>
            </div>
            <div className="max-min-temperature">
                <label className='max'>Max: {maxTemperature}</label>
                <label className='min'>Min: {minTemperature}</label>
            </div>
        </div>
    )
}