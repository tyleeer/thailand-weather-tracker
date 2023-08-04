interface weatherDataRespon {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: Current[];
}

type Current = {
  name: string;
  record: number;
};

const Current = [
  { name: "dt", record: fetchWeatherData.current.dt },
  { name: "sunrise", record: fetchWeatherData.current.sunrise },
  { name: "sunset", record: fetchWeatherData.current.sunset },
  { name: "temp", record: fetchWeatherData.current.temp },
  { name: "feels_like", record: fetchWeatherData.current.feels_like },
  { name: "pressure", record: fetchWeatherData.current.pressure },
  { name: "humidity", record: fetchWeatherData.current.humidity },
  { name: "dew_point", record: fetchWeatherData.current.dew_point },
  { name: "uvi", record: fetchWeatherData.current.uvi },
  { name: "clouds", record: fetchWeatherData.current.clouds },
  { name: "visibility", record: fetchWeatherData.current.visibility },
  { name: "wind_speed", record: fetchWeatherData.current.wind_speed },
  { name: "wind_deg", record: fetchWeatherData.current.wind_deg },
  { name: "weather", record: fetchWeatherData.current.weather },
];

Current: {
  { name: "dt", record: fetchWeatherData.current.dt },
  { name: "sunrise", record: fetchWeatherData.current.sunrise },
  { name: "sunset", record: fetchWeatherData.current.sunset },
  { name: "temp", record: fetchWeatherData.current.temp },
  { name: "feels_like", record: fetchWeatherData.current.feels_like },
  { name: "pressure", record: fetchWeatherData.current.pressure },
  { name: "humidity", record: fetchWeatherData.current.humidity },
  { name: "dew_point", record: fetchWeatherData.current.dew_point },
  { name: "uvi", record: fetchWeatherData.current.uvi },
  { name: "clouds", record: fetchWeatherData.current.clouds },
  { name: "visibility", record: fetchWeatherData.current.visibility },
  { name: "wind_speed", record: fetchWeatherData.current.wind_speed },
  { name: "wind_deg", record: fetchWeatherData.current.wind_deg },
  { name: "weather", record: fetchWeatherData.current.weather },
}
