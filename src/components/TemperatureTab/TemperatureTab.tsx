import { useContext, useEffect, useState } from 'react'
import { ForecastContext } from '../../App';
import { ForecastContextInterface } from '../../types';
import './TemperatureTab.css'

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default function TemperatureTab() {
    const [date, setDate] = useState('');
    const [month, setMonth] = useState('');
    const [temperature, setTemperature] = useState(0);

    const Context: ForecastContextInterface = useContext(ForecastContext)!;

    useEffect(() => {
        var data = Context.data;
        if (data === undefined) return;

        setTemperature(data.current_weather.temperature);
        var today = new Date();
        setDate(dayNames[today.getDay()] + ", " + today.getDate());
        setMonth(monthNames[today.getMonth()]);

        /*SEARCH BY HOURS AND DATES
        for (var i in data!.hourly.time) {
            var date = new Date(data!.hourly.time[i]);

            if (date.getDate() != now.getDate()) continue;
            if (date.getHours() != now.getHours()) continue;

            setTemperature(data.hourly.temperature_2m[i]);
        }*/
    }, [])

    return (
        <div className='temperature-content'>
            <div className="location-wrapper">
                <label className='location'>{Context.cityName}</label>
            </div>
            <div className="temperature-wrapper">
                <label className='temperature'>{temperature}º</label>
            </div>
            <div className="date">
                <label className='max'>{date}</label>
                <label className='min'>{month}</label>
            </div>
        </div>
    )
}