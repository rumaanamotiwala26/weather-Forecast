export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  visibility: number;
  windSpeed: number;
  windDirection: number;
  description: string;
  main: string;
  icon: string;
  sunrise: string;
  sunset: string;
  timestamp: string;
}

export interface WeatherError {
  error: string;
}

export interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}
