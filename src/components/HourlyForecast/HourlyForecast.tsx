import { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { HourData } from "../../services/weatherApi";
import { formatTemp } from "../../utils/helpers";
import { motion } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";

interface HourlyForecastProps {
  hours: HourData[];
}

export default function HourlyForecast({ hours }: HourlyForecastProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const unit = useSelector((s: RootState) => s.settings.unit);
  const unitSymbol = unit === "celsius" ? "°C" : "°F";

  const now = new Date();
  const currentHour = now.getHours();
  const nextHours = hours.filter((h) => {
    const hourTime = new Date(h.time.replace(" ", "T"));
    return hourTime.getHours() >= currentHour;
  }).slice(0, 24);

  if (nextHours.length === 0) return null;

  function scrollRight() {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">Hourly Forecast</h3>
        <span className="text-xs text-white/30">Next 24 hours</span>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-2.5 overflow-x-auto pb-2 hide-scrollbar"
        >
          {nextHours.map((hour, i) => {
            const time = new Date(hour.time.replace(" ", "T"));
            const label = i === 0 ? "Now" : time.toLocaleTimeString("en-US", { hour: "numeric", hour12: true });

            return (
              <div
                key={hour.time_epoch}
                className={`flex shrink-0 flex-col items-center gap-2 rounded-xl border px-4 py-3 transition-all hover:scale-105 min-w-[76px] ${
                  i === 0
                    ? "border-white/25 bg-white/15 shadow-lg"
                    : "border-white/8 bg-white/8 hover:bg-white/12"
                }`}
              >
                <span className={`text-xs font-medium ${i === 0 ? "text-white" : "text-white/50"}`}>
                  {label}
                </span>
                <img src={hour.condition.icon} alt="" className="h-8 w-8" />
                <span className="text-sm font-semibold text-white">
                  {formatTemp(hour.temp_c, unit)}{unitSymbol}
                </span>
                {hour.chance_of_rain > 0 && (
                  <span className="text-[10px] font-medium text-blue-300">
                    {hour.chance_of_rain}%
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/60 hover:text-white transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
        >
          <FiChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}
