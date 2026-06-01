import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { toggleDarkMode } from "../../store/settingsSlice";
import { setCurrentCity } from "../../store/weatherSlice";
import { FiHeart, FiSettings, FiSun, FiMoon, FiClock, FiX } from "react-icons/fi";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";

export default function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const darkMode = useSelector((s: RootState) => s.settings.darkMode);
  const recentSearches = useSelector((s: RootState) => s.weather.recentSearches);
  const [showRecents, setShowRecents] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-white bg-white/20 shadow-lg"
      : "text-white/60 hover:text-white hover:bg-white/10";

  function handleSearch(city: string) {
    dispatch(setCurrentCity(city));
  }

  function handleRecentClick(city: string) {
    dispatch(setCurrentCity(city));
    setShowRecents(false);
  }

  const navLinks = [
    { path: "/", icon: null, label: "Home" },
    { path: "/favorites", icon: FiHeart, label: "Favorites" },
    { path: "/settings", icon: FiSettings, label: "Settings" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-2xl shadow-xl shadow-black/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <span className="text-2xl">🌤️</span>
          <span className="hidden text-xl font-bold text-white sm:block group-hover:text-white/90 transition-colors">
            WeatherNow
          </span>
        </Link>

        <div className="hidden flex-1 justify-center px-4 md:flex">
          <SearchBar onSelect={handleSearch} />
        </div>

        <nav className="hidden items-center gap-1.5 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${isActive(link.path)}`}
              >
                {Icon && <Icon size={16} />}
                {link.label}
              </Link>
            );
          })}
          <div className="mx-2 h-6 w-px bg-white/10" />
          <div className="relative">
            <button
              onClick={() => { setShowRecents(!showRecents); }}
              className="rounded-xl px-3 py-2.5 text-white/60 transition-all hover:bg-white/10 hover:text-white"
              title="Recent Searches"
            >
              <FiClock size={16} />
            </button>
            {showRecents && recentSearches.length > 0 && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowRecents(false)} />
                <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl bg-white/10 backdrop-blur-2xl border border-white/10 shadow-2xl">
                  <div className="border-b border-white/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white/40">
                    Recent Searches
                  </div>
                  {recentSearches.map((city) => (
                    <button
                      key={city}
                      onClick={() => handleRecentClick(city)}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-white/80 transition-colors hover:bg-white/10"
                    >
                      <FiClock size={13} className="shrink-0 text-white/30" />
                      {city}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className="rounded-xl p-2.5 text-white/60 transition-all hover:bg-white/10 hover:text-white"
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            {darkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex flex-col gap-1 rounded-xl p-2.5 text-white/60 transition-all hover:bg-white/10 md:hidden"
        >
          <span className={`block h-0.5 w-5 rounded bg-current transition-all ${mobileMenuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-5 rounded bg-current transition-all ${mobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 rounded bg-current transition-all ${mobileMenuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-black/40 backdrop-blur-2xl md:hidden">
          <div className="px-4 py-4">
            <SearchBar onSelect={(city) => { handleSearch(city); setMobileMenuOpen(false); }} />
          </div>
          <nav className="flex flex-col gap-1 px-4 pb-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${isActive(link.path)}`}
                >
                  {Icon && <Icon size={16} />}
                  {link.label}
                </Link>
              );
            })}
            <div className="my-2 h-px bg-white/10" />
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition-all hover:bg-white/10 hover:text-white"
            >
              {darkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
