import { getAQIInfo } from "../../utils/helpers";
import { motion } from "framer-motion";

interface AQICardProps {
  aqi: number;
}

export default function AQICard({ aqi }: AQICardProps) {
  const info = getAQIInfo(aqi);
  const percentage = Math.min((aqi / 500) * 100, 100);

  const levelColors = [
    { min: 0, max: 50, color: "bg-green-400" },
    { min: 50, max: 100, color: "bg-yellow-400" },
    { min: 100, max: 150, color: "bg-orange-400" },
    { min: 150, max: 200, color: "bg-red-400" },
    { min: 200, max: 300, color: "bg-purple-400" },
    { min: 300, max: 500, color: "bg-rose-700" },
  ];

  let markerPosition = 0;
  for (const level of levelColors) {
    if (aqi >= level.min && aqi <= level.max) {
      markerPosition = ((aqi - level.min) / (level.max - level.min)) * 20 + (level.min / 500) * 100;
      break;
    }
  }
  markerPosition = Math.min(Math.max(markerPosition, 0), 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">Air Quality</h3>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-light tracking-tighter text-white">{aqi}</span>
            <span className="text-sm font-medium text-white/40">AQI</span>
          </div>
          <span className={`rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-md ${info.color}`}>
            {info.label}
          </span>
        </div>

        <div className="relative mt-6">
          <div className="flex h-2 overflow-hidden rounded-full">
            {levelColors.map((level, i) => (
              <div
                key={i}
                className={`${level.color} ${i > 0 ? "border-l border-black/10" : ""}`}
                style={{ width: `${100 / levelColors.length}%` }}
              />
            ))}
          </div>

          <div
            className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-white bg-black shadow-lg transition-all duration-500"
            style={{ left: `calc(${markerPosition}% - 8px)` }}
          >
            <div className="absolute -inset-1 animate-ping rounded-full bg-white/20" />
          </div>
        </div>

        <div className="mt-2 flex justify-between text-[10px] font-medium text-white/30">
          <span>0</span>
          <span>100</span>
          <span>200</span>
          <span>300</span>
          <span>400</span>
          <span>500</span>
        </div>
      </div>
    </motion.div>
  );
}
