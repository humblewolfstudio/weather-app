export interface ForecastContextInterface {
    data?: Forecast,
    cityName: string
}

export interface Forecast {
    current_weather: current_weather,
    elevation: number,
    generationtime_ms: number,
    hourly: hourly,
    hourly_units: any,
    latitude: number,
    longitude: number,
    timezone: string,
    timezone_abbreviation: string,
    utc_offset_seconds: number
}

interface hourly {
    relativehumidity_2m: Array<number>,
    temperature_2m: Array<number>,
    time: Array<string>,
    windspeed_10m: Array<number>
}

interface current_weather {
    temperature: number,
    time: string,
    weathercode: number,
    winddirection: number,
    windspeed: number
}

export interface HourlyForecastInterface {
    time: string,
    temperature: string
}

export interface WeeklyForecastInterface {
    weekDay: string,
    mediumTemperature: string
}

export interface city {
    country: string,
    name: string,
    lat: string,
    lon: string
}