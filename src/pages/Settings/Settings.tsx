import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { toggleUnit, toggleDarkMode } from "../../store/settingsSlice";
import { motion } from "framer-motion";
import { FiThermometer, FiSun, FiMoon, FiTrash2 } from "react-icons/fi";
import { clearRecentSearches, clearFavorites } from "../../store/weatherSlice";

export default function Settings() {
  const dispatch = useDispatch();
  const { unit, darkMode } = useSelector((s: RootState) => s.settings);
  const recentSearches = useSelector((s: RootState) => s.weather.recentSearches);
  const favoriteCities = useSelector((s: RootState) => s.weather.favoriteCities);

  const settings = [
    {
      title: "Temperature Unit",
      description: unit === "celsius" ? "Display temperatures in Celsius" : "Display temperatures in Fahrenheit",
      icon: FiThermometer,
      control: (
        <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 p-0.5">
          <button
            onClick={() => { if (unit !== "celsius") dispatch(toggleUnit()); }}
            className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-all ${
              unit === "celsius"
                ? "bg-white/20 text-white shadow-sm"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            °C
          </button>
          <button
            onClick={() => { if (unit !== "fahrenheit") dispatch(toggleUnit()); }}
            className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-all ${
              unit === "fahrenheit"
                ? "bg-white/20 text-white shadow-sm"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            °F
          </button>
        </div>
      ),
    },
    {
      title: "Appearance",
      description: darkMode ? "Dark mode is active" : "Light mode is active",
      icon: darkMode ? FiMoon : FiSun,
      control: (
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition-all ${
            darkMode
              ? "border-amber-400/30 bg-amber-400/10 text-amber-300 hover:bg-amber-400/20"
              : "border-indigo-400/30 bg-indigo-400/10 text-indigo-300 hover:bg-indigo-400/20"
          }`}
        >
          {darkMode ? <FiSun size={14} /> : <FiMoon size={14} />}
          {darkMode ? "Light" : "Dark"}
        </button>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl font-bold text-white">Settings</h2>
        <p className="mt-0.5 text-sm text-white/40">Customize your experience</p>
      </motion.div>

      <div className="space-y-2.5">
        {settings.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md transition-all hover:border-white/20"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="text-white/50" size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="text-xs text-white/40">{item.description}</p>
                </div>
              </div>
              {item.control}
            </motion.div>
          );
        })}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md"
        >
          <div className="flex items-center gap-3.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
              <FiTrash2 className="text-white/50" size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Clear Data</p>
              <p className="text-xs text-white/40">
                {favoriteCities.length} favorites · {recentSearches.length} recent
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              dispatch(clearRecentSearches());
              dispatch(clearFavorites());
            }}
            className="rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-white/50 transition-all hover:bg-white/10 hover:text-white/80"
          >
            Clear All
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="border-t border-white/5 pt-6 text-center"
      >
        <p className="text-xs font-medium text-white/20">WeatherNow v1.0.0</p>
        <p className="mt-1 text-[10px] text-white/10">Powered by WeatherAPI.com</p>
      </motion.div>
    </div>
  );
}
