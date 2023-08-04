// export interface Root {
//   data: weatherDataRespon;
//   status: number;
//   statusText: string;
//   headers: Headers;
//   config: Config;
//   request: Request;
// }

export interface weatherDataResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: Current;
  minutely: Minutely[];
  hourly: Hourly[];
  daily: Daily[];
  alert?: Alert;
  name: string;
  local_name: string;
}

export interface Alert {
  sender_name: string;
  event: string;
  start: string;
  end: string;
  description: string;
  // tags?: Tags[];
}

// export interface Tags {

// }

export interface Current {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: Weather[];
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Minutely {
  dt: number;
  precipitation: number;
}

export interface Hourly {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather2[];
  pop: number;
  rain?: Rain;
}

export interface Weather2 {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Rain {
  "1h": number;
}

export interface Daily {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: Temp;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather3[];
  clouds: number;
  pop: number;
  rain: number;
  uvi: number;
}

export interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface Weather3 {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Headers {
  "content-length": string;
  "content-type": string;
}

export interface Config {
  transitional: Transitional;
  adapter: string[];
  transformRequest: any[];
  transformResponse: any[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  //   env: Env
  headers: Headers2;
  method: string;
  url: string;
}

export interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

// export interface Env {}

export interface Headers2 {
  Accept: string;
}

// export interface Request {}
