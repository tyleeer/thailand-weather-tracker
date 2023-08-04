export interface daySummaryResponse {
  lat: number;
  lon: number;
  tz: string;
  date: string;
  units: string;
  cloud_cover: CloudCover;
  humidity: Humidity;
  precipitation: Precipitation;
  temperature: Temperature;
  pressure: Pressure;
  wind: Wind;
}

export interface CloudCover {
  afternoon: number;
}

export interface Humidity {
  afternoon: number;
}

export interface Precipitation {
  total: number;
}

export interface Temperature {
  min: number;
  max: number;
  afternoon: number;
  night: number;
  evening: number;
  morning: number;
}

export interface Pressure {
  afternoon: number;
}

export interface Wind {
  max: Max;
}

export interface Max {
  speed: number;
  direction: number;
}
