import { FiAlertTriangle, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Alert {
  headline: string;
  severity: string;
  desc: string;
  effective: string;
  expires: string;
}

interface WeatherAlertsProps {
  alerts: Alert[];
}

export default function WeatherAlerts({ alerts }: WeatherAlertsProps) {
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());

  const visible = alerts.filter((_, i) => !dismissed.has(i));
  if (visible.length === 0) return null;

  const severityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case "extreme": return "border-red-500/40 bg-red-500/15";
      case "severe": return "border-orange-500/40 bg-orange-500/15";
      default: return "border-yellow-500/30 bg-yellow-500/10";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">Weather Alerts</h3>
        <span className="text-xs text-white/30">{visible.length} active</span>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {visible.map((alert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              className={`flex items-start gap-3 rounded-xl border p-4 ${severityColor(alert.severity)}`}
            >
              <FiAlertTriangle className="mt-0.5 shrink-0 text-red-400/80" size={18} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{alert.headline}</p>
                {alert.desc && (
                  <p className="mt-1 text-xs leading-relaxed text-white/60 line-clamp-2">{alert.desc}</p>
                )}
              </div>
              <button
                onClick={() => setDismissed(new Set([...dismissed, i]))}
                className="shrink-0 rounded-lg p-1 text-white/30 transition-colors hover:bg-white/10 hover:text-white"
              >
                <FiX size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
