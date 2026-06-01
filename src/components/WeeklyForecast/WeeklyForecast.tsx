import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ForecastDay } from "../../services/weatherApi";
import { formatTemp } from "../../utils/helpers";
import { motion } from "framer-motion";
import { FiDroplet } from "react-icons/fi";

interface WeeklyForecastProps {
  forecast: ForecastDay[];
}

export default function WeeklyForecast({ forecast }: WeeklyForecastProps) {
  const unit = useSelector((s: RootState) => s.settings.unit);
  const unitSymbol = unit === "celsius" ? "°C" : "°F";

  const temps = forecast.map((d) => d.day.maxtemp_c);
  const maxTemp = Math.max(...temps);
  const minTemp = Math.min(...temps);
  const range = maxTemp - minTemp || 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">7-Day Forecast</h3>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
        <div className="divide-y divide-white/5">
          {forecast.map((day, i) => {
            const date = new Date(day.date + "T00:00:00");
            const dayName = i === 0 ? "Today" : date.toLocaleDateString("en-US", { weekday: "long" });
            const max = formatTemp(day.day.maxtemp_c, unit);
            const min = formatTemp(day.day.mintemp_c, unit);
            const barWidth = ((day.day.maxtemp_c - minTemp) / range) * 85 + 5;

            return (
              <div
                key={day.date}
                className="flex items-center gap-3 px-4 py-3 sm:px-5 transition-colors hover:bg-white/5"
              >
                <span className="w-16 text-sm font-medium text-white/70 sm:w-20">{dayName}</span>

                <img src={day.day.condition.icon} alt="" className="h-7 w-7 shrink-0" />

                <span className="hidden flex-1 truncate text-xs text-white/40 sm:block">
                  {day.day.condition.text}
                </span>

                <div className="flex flex-1 items-center gap-2 sm:flex-none">
                  <span className="w-7 text-right text-xs font-medium text-white/50">{min}{unitSymbol}</span>
                  <div className="relative h-1.5 w-20 flex-shrink-0 overflow-hidden rounded-full bg-white/10 sm:w-28">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-400 via-amber-400 to-orange-400 transition-all duration-500"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  <span className="w-7 text-right text-xs font-semibold text-white">{max}{unitSymbol}</span>
                </div>

                {day.day.daily_chance_of_rain > 0 && (
                  <div className="flex items-center gap-1 text-xs text-blue-300 w-10 justify-end">
                    <FiDroplet size={10} />
                    {day.day.daily_chance_of_rain}%
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
