import { useContext, useEffect, useState } from "react";
import { ForecastContext } from "../../App";
import { ForecastContextInterface, WeeklyForecastInterface } from "../../types";
import DailyForecast from "../DailyForecast/DailyForecast";

import './WeekForecast.css'

var madeForecast = false;

const calculateMedium = (array: Array<number>) => {
    var n = array.length;
    var sum = 0;

    for (var i in array) {
        sum += array[i];
    }

    return Math.round(sum / n * 10) / 10;
}

const getDayName = (i: number): string => {
    switch (i) {
        case 0:
            return "Monday";
        case 1:
            return "Tuesday";
        case 2:
            return "Wednesday";
        case 3:
            return "Thursday";
        case 4:
            return "Friday";
        case 5:
            return "Saturday";
        case 6:
            return "Sunday";
        default:
            return "";
    }
}

export default function WeekForecast() {
    const Context: ForecastContextInterface = useContext(ForecastContext)!;
    const [weekTemperatures, setWeekTemperatures] = useState<Array<WeeklyForecastInterface>>([]);

    useEffect(() => {
        if (madeForecast) return;
        var data = Context.data;
        if (data == undefined) return;
        console.log(data);

        var temperatures = [];

        for (var i = 0; i < 7; i++) {
            var dayTemperatures = data.hourly.temperature_2m.slice(24 * i, 24 * (i + 1));
            var dailyForecast: WeeklyForecastInterface = { weekDay: getDayName(i), mediumTemperature: calculateMedium(dayTemperatures) + "º" };
            temperatures.push(dailyForecast);
        }
        setWeekTemperatures(temperatures);
        madeForecast = true;
    })

    return (
        <div className="week-forecast-content">
            <div className="title-wrapper">
                <label>Week Forecast</label>
            </div>
            <div className="daily-forecast-wrapper">
                {weekTemperatures.map(function (object, i) {
                    return <DailyForecast key={i} weekDay={object.weekDay} temperature={object.mediumTemperature} />
                })}
            </div>
        </div>
    )
}