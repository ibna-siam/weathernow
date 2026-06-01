import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-16">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        className="relative h-14 w-14"
      >
        <div className="absolute inset-0 rounded-full border-[3px] border-white/10" />
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-white/70" />
      </motion.div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-base font-medium text-white/70">Loading weather data</p>
        <p className="text-sm text-white/40">Fetching latest forecast...</p>
      </div>

      <div className="grid w-full max-w-lg grid-cols-3 gap-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-20 rounded-xl skeleton-pulse"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
