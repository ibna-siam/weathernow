import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setCurrentCity, removeFavorite } from "../../store/weatherSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart, FiX, FiSearch, FiArrowRight } from "react-icons/fi";

export default function Favorites() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favoriteCities = useSelector((s: RootState) => s.weather.favoriteCities);

  function handleSelect(city: string) {
    dispatch(setCurrentCity(city));
    navigate("/");
  }

  function handleRemove(city: string, e: React.MouseEvent) {
    e.stopPropagation();
    dispatch(removeFavorite(city));
  }

  if (favoriteCities.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
          <FiHeart size={28} className="text-white/20" />
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-white/60">No favorite cities yet</p>
          <p className="mt-1 text-sm text-white/40">
            Search for a city and tap the heart icon to save it
          </p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-5 py-2.5 text-sm font-medium text-white/80 backdrop-blur-md transition-all hover:bg-white/20 hover:text-white"
        >
          <FiSearch size={15} />
          Search Cities
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h2 className="text-xl font-bold text-white">Favorite Cities</h2>
          <p className="mt-0.5 text-sm text-white/40">{favoriteCities.length} saved</p>
        </div>
      </motion.div>

      <div className="space-y-2.5">
        {favoriteCities.map((city, i) => (
          <motion.div
            key={city}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            layout
            className="group cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10"
            onClick={() => handleSelect(city)}
          >
            <div className="flex items-center justify-between px-4 py-3.5 sm:px-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/20">
                  <FiHeart className="text-red-400" size={15} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{city}</p>
                  <p className="text-xs text-white/40">Tap to view weather</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FiArrowRight
                  size={15}
                  className="text-white/20 transition-all group-hover:text-white/50 group-hover:translate-x-0.5"
                />
                <button
                  onClick={(e) => handleRemove(city, e)}
                  className="rounded-lg p-1.5 text-white/20 opacity-0 transition-all hover:bg-white/10 hover:text-white/60 group-hover:opacity-100"
                >
                  <FiX size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
