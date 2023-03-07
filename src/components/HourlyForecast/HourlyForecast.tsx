import './HourlyForecast.css'

interface HourlyForecastProps {
    time: string,
    temperature: string
}

export default function HourlyForecast(props: HourlyForecastProps) {
    return (
        <div className="hourly-wrapper">
            <label>{props.time}</label>
            <label>{props.temperature}</label>
        </div>
    )
}