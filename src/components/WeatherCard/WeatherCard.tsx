import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { WeatherData } from "../../services/weatherApi";
import { formatTemp } from "../../utils/helpers";
import { toggleFavorite } from "../../store/weatherSlice";
import { motion } from "framer-motion";
import { FiHeart, FiMapPin } from "react-icons/fi";

interface WeatherCardProps {
  data: WeatherData;
}

export default function WeatherCard({ data }: WeatherCardProps) {
  const dispatch = useDispatch();
  const unit = useSelector((s: RootState) => s.settings.unit);
  const favoriteCities = useSelector((s: RootState) => s.weather.favoriteCities);
  const cityKey = `${data.location.name}, ${data.location.country}`;
  const isFavorite = favoriteCities.includes(cityKey);
  const temp = formatTemp(data.current.temp_c, unit);
  const feelsLike = formatTemp(data.current.feelslike_c, unit);
  const unitSymbol = unit === "celsius" ? "°C" : "°F";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-2xl shadow-2xl shadow-black/20"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

      <div className="relative px-6 py-6 sm:px-8 sm:py-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <FiMapPin size={14} className="text-white/50" />
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                {data.location.name}
              </h2>
            </div>
            <p className="mt-0.5 text-sm text-white/50">{data.location.country}</p>
          </div>
          <button
            onClick={() => dispatch(toggleFavorite(cityKey))}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 transition-all hover:bg-white/20 active:scale-90"
          >
            <FiHeart
              size={16}
              className={isFavorite ? "fill-red-400 text-red-400" : "text-white/50"}
            />
          </button>
        </div>

        <div className="mt-6 flex items-center gap-5">
          <img
            src={data.current.condition.icon}
            alt={data.current.condition.text}
            className="h-16 w-16 drop-shadow-lg sm:h-20 sm:w-20"
          />
          <div>
            <div className="flex items-start">
              <span className="text-5xl font-light tracking-tighter text-white sm:text-6xl">
                {temp}
              </span>
              <span className="ml-1 mt-1 text-xl font-medium text-white/60">{unitSymbol}</span>
            </div>
            <p className="mt-0.5 text-sm text-white/60">
              Feels like {feelsLike}{unitSymbol}
            </p>
          </div>
        </div>

        <div className="mt-2">
          <p className="text-base font-medium text-white/80">{data.current.condition.text}</p>
          <p className="mt-0.5 text-xs text-white/40">
            Updated {data.current.last_updated}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2 rounded-xl bg-white/5 p-3 sm:gap-3 sm:p-4">
          {[
            { label: "Humidity", value: `${data.current.humidity}%` },
            { label: "Wind", value: `${data.current.wind_kph} km/h` },
            { label: "Pressure", value: `${data.current.pressure_mb} mb` },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-[10px] uppercase tracking-wider text-white/40">{item.label}</p>
              <p className="mt-0.5 text-sm font-semibold text-white sm:text-base">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
