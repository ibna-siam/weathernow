import axios from "axios";
import { API_BASE_URL, API_KEY } from "../utils/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  params: {
    key: API_KEY,
  },
});

function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status;
    const data = err.response?.data as { error?: { message?: string; code?: number } } | undefined;
    const apiCode = data?.error?.code;

    if (!API_KEY) return "API key is not set. Create a .env file with VITE_WEATHER_API_KEY=your_key";
    if (status === 401 || status === 403) return "Invalid API key";
    if (status === 404 || apiCode === 1003) return "City not found";
    if (apiCode === 1006) return "No location found matching that name";
    if (status === 429 || apiCode === 2008) return "API rate limit exceeded. Try again later";
    if (status && status >= 500) return "Weather service is temporarily unavailable";
    return data?.error?.message || "Failed to fetch weather data";
  }
  if (err instanceof Error) return err.message;
  return "An unknown error occurred";
}

export interface WeatherData {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    feelslike_c: number;
    feelslike_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    humidity: number;
    wind_kph: number;
    wind_dir: string;
    pressure_mb: number;
    uv: number;
    vis_km: number;
    gust_kph: number;
    is_day: number;
    last_updated: string;
  };
  forecast?: {
    forecastday: ForecastDay[];
  };
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    maxtemp_f: number;
    mintemp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    daily_chance_of_rain: number;
    avghumidity: number;
    maxwind_kph: number;
    uv: number;
  };
  hour: HourData[];
  astro: {
    sunrise: string;
    sunset: string;
  };
}

export interface HourData {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  condition: {
    text: string;
    icon: string;
  };
  chance_of_rain: number;
  humidity: number;
  wind_kph: number;
}

export interface AQIData {
  data: {
    aqi: number;
    iaqi: {
      pm25?: { v: number };
      pm10?: { v: number };
      o3?: { v: number };
      no2?: { v: number };
      so2?: { v: number };
      co?: { v: number };
    };
  };
}

export async function fetchWeather(city: string): Promise<WeatherData> {
  try {
    const response = await api.get<WeatherData>("/forecast.json", {
      params: { q: city, days: 7, aqi: "yes" },
    });
    return response.data;
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}

export async function fetchAQI(lat: number, lon: number): Promise<AQIData> {
  try {
    const response = await api.get<AQIData>("/current.json", {
      params: { q: `${lat},${lon}`, aqi: "yes" },
    });
    return response.data;
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}

export async function searchCities(query: string) {
  try {
    const response = await api.get("/search.json", {
      params: { q: query },
    });
    return response.data;
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}
