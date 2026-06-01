export const API_BASE_URL = "https://api.weatherapi.com/v1";
export const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "";

export const WEATHER_CONDITIONS: Record<string, { label: string; gradient: string }> = {
  Sunny: { label: "Sunny", gradient: "from-amber-400 via-orange-300 to-sky-400" },
  Clear: { label: "Clear", gradient: "from-indigo-900 via-purple-800 to-blue-900" },
  "Partly cloudy": { label: "Partly Cloudy", gradient: "from-blue-400 via-blue-300 to-gray-300" },
  Cloudy: { label: "Cloudy", gradient: "from-gray-400 via-gray-500 to-gray-600" },
  Overcast: { label: "Overcast", gradient: "from-gray-500 via-gray-600 to-gray-700" },
  Mist: { label: "Mist", gradient: "from-gray-300 via-gray-400 to-gray-500" },
  "Light rain": { label: "Light Rain", gradient: "from-blue-500 via-blue-600 to-gray-700" },
  "Moderate rain": { label: "Rain", gradient: "from-blue-600 via-blue-700 to-gray-800" },
  "Heavy rain": { label: "Heavy Rain", gradient: "from-blue-700 via-blue-800 to-gray-900" },
  Thunderstorm: { label: "Thunderstorm", gradient: "from-gray-700 via-purple-800 to-gray-900" },
  Snow: { label: "Snow", gradient: "from-blue-100 via-white to-gray-200" },
  Fog: { label: "Fog", gradient: "from-gray-300 via-gray-400 to-gray-500" },
};

export const AQI_LEVELS = [
  { range: [0, 50], label: "Good", color: "text-green-400" },
  { range: [51, 100], label: "Moderate", color: "text-yellow-400" },
  { range: [101, 150], label: "Unhealthy for Sensitive Groups", color: "text-orange-400" },
  { range: [151, 200], label: "Unhealthy", color: "text-red-400" },
  { range: [201, 300], label: "Very Unhealthy", color: "text-purple-400" },
  { range: [301, 500], label: "Hazardous", color: "text-rose-800" },
];

export const DEFAULT_CITY = "Dhaka";
export const MAX_RECENT_SEARCHES = 5;
