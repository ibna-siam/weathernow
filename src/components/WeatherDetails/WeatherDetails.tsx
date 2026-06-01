import { WeatherData } from "../../services/weatherApi";
import { motion } from "framer-motion";
import {
  FiDroplet, FiWind, FiSun, FiEye,
  FiThermometer, FiArrowUp,
} from "react-icons/fi";
import { BsSunrise, BsSunset } from "react-icons/bs";

interface WeatherDetailsProps {
  data: WeatherData;
}

const details = [
  { key: "Humidity", icon: FiDroplet, value: (d: WeatherData) => `${d.current.humidity}%`, color: "text-sky-300" },
  { key: "Wind", icon: FiWind, value: (d: WeatherData) => `${d.current.wind_kph} km/h`, color: "text-teal-300" },
  { key: "UV Index", icon: FiSun, value: (d: WeatherData) => `${d.current.uv}`, color: "text-amber-300" },
  { key: "Visibility", icon: FiEye, value: (d: WeatherData) => `${d.current.vis_km} km`, color: "text-emerald-300" },
  { key: "Pressure", icon: FiThermometer, value: (d: WeatherData) => `${d.current.pressure_mb} mb`, color: "text-violet-300" },
  { key: "Gust", icon: FiArrowUp, value: (d: WeatherData) => `${d.current.gust_kph} km/h`, color: "text-rose-300" },
];

export default function WeatherDetails({ data }: WeatherDetailsProps) {
  const sunrise = data.forecast?.forecastday[0]?.astro?.sunrise;
  const sunset = data.forecast?.forecastday[0]?.astro?.sunset;
  const allItems = [
    ...details,
    ...(sunrise ? [{ key: "Sunrise", icon: BsSunrise, value: () => sunrise, color: "text-amber-300" }] : []),
    ...(sunset ? [{ key: "Sunset", icon: BsSunset, value: () => sunset, color: "text-orange-300" }] : []),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">Weather Details</h3>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
        {allItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.key}
              className="group rounded-xl border border-white/8 bg-white/5 p-4 transition-all hover:border-white/20 hover:bg-white/10"
            >
              <Icon className={`mb-2 ${item.color}`} size={18} />
              <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">{item.key}</p>
              <p className="mt-1 text-base font-semibold text-white">{item.value(data)}</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
