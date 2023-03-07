import './DailyForecast.css'

interface DailyForecastProps {
    weekDay: string,
    temperature: string
}

export default function DailyForecast(props: DailyForecastProps) {
    return (
        <div className="daily-wrapper">
            <label>{props.weekDay}</label>
            <label>{props.temperature}</label>
        </div>
    )
}