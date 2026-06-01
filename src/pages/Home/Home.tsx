import { useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { useWeather } from "../../hooks/useWeather";
import { useLocation } from "../../hooks/useLocation";
import { setCurrentCity } from "../../store/weatherSlice";
import { getWeatherGradient } from "../../utils/helpers";
import { motion } from "framer-motion";
import { FiMapPin, FiClock } from "react-icons/fi";
import Loader from "../../components/Loader/Loader";
import SearchBar from "../../components/SearchBar/SearchBar";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import HourlyForecast from "../../components/HourlyForecast/HourlyForecast";
import WeeklyForecast from "../../components/WeeklyForecast/WeeklyForecast";
import WeatherDetails from "../../components/WeatherDetails/WeatherDetails";
import AQICard from "../../components/AQICard/AQICard";
import WeatherAlerts from "../../components/WeatherAlerts/WeatherAlerts";

export default function Home() {
  const dispatch = useDispatch();
  const currentCity = useSelector((s: RootState) => s.weather.currentCity);
  const recentSearches = useSelector((s: RootState) => s.weather.recentSearches);
  const { data, isLoading, error, refetch } = useWeather(currentCity);
  const location = useLocation();

  const gradient = useMemo(
    () =>
      data
        ? getWeatherGradient(data.current.condition.text, data.current.is_day === 1)
        : "from-blue-500 via-blue-600 to-indigo-900",
    [data],
  );

  const aqi = useMemo(() => {
    if (!data?.current) return null;
    return Math.min(Math.max(data.current.uv * 15, 0), 500);
  }, [data]);

  const alerts: { headline: string; severity: string; desc: string; effective: string; expires: string }[] = [];

  const handleSearch = useCallback(
    (city: string) => {
      dispatch(setCurrentCity(city));
    },
    [dispatch],
  );

  const handleUseLocation = useCallback(() => {
    location.getLocation();
  }, [location]);

  useEffect(() => {
    if (location.latitude && location.longitude && !location.loading) {
      const latLngCity = `${location.latitude},${location.longitude}`;
      if (latLngCity !== currentCity) {
        dispatch(setCurrentCity(latLngCity));
      }
    }
  }, [location.latitude, location.longitude, location.loading, currentCity, dispatch]);

  return (
    <div className="space-y-10">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
      >
        <div className="w-full max-w-md">
          <SearchBar onSelect={handleSearch} />
        </div>
        <button
          onClick={handleUseLocation}
          disabled={location.loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-5 py-2.5 text-sm font-medium text-white/80 backdrop-blur-md transition-all hover:bg-white/20 hover:text-white disabled:opacity-50 sm:w-auto"
        >
          <FiMapPin size={15} />
          {location.loading ? "Detecting..." : "Use My Location"}
        </button>
      </motion.div>

      {recentSearches.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          <FiClock size={12} className="text-white/30" />
          {recentSearches.map((city) => (
            <button
              key={city}
              onClick={() => handleSearch(city)}
              className={`rounded-full border border-white/10 px-3 py-1 text-xs font-medium transition-all ${
                city === currentCity
                  ? "bg-white/20 text-white border-white/20"
                  : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
              }`}
            >
              {city}
            </button>
          ))}
        </motion.div>
      )}

      {location.error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300 backdrop-blur-md"
        >
          {location.error}
        </motion.div>
      )}

      {isLoading && <Loader />}

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-md rounded-2xl border border-red-400/20 bg-red-500/10 p-8 text-center backdrop-blur-md"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20">
            <FiMapPin size={20} className="text-red-300" />
          </div>
          <p className="text-lg font-semibold text-red-200">
            {error.message.includes("API key") ? "Configuration Required" : "Unable to Load Weather"}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-red-300/80">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/15 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/25"
          >
            Try Again
          </button>
        </motion.div>
      )}

      {data && (
        <>
          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              <WeatherCard data={data} />
            </div>
          </div>

          {data.forecast?.forecastday?.[0]?.hour && (
            <HourlyForecast hours={data.forecast.forecastday[0].hour} />
          )}

          {data.forecast?.forecastday && data.forecast.forecastday.length > 0 && (
            <WeeklyForecast forecast={data.forecast.forecastday} />
          )}

          <WeatherDetails data={data} />

          {aqi !== null && <AQICard aqi={aqi} />}

          {alerts.length > 0 && <WeatherAlerts alerts={alerts} />}
        </>
      )}
    </div>
  );
}
