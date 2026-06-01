import { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { searchCities } from "../../services/weatherApi";

interface SearchBarProps {
  onSelect: (city: string) => void;
  placeholder?: string;
}

interface Suggestion {
  id: number;
  name: string;
  country: string;
  region: string;
}

export default function SearchBar({ onSelect, placeholder = "Search city..." }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchCities(query);
        const filtered = (data || []).filter(
          (s: Suggestion, i: number, arr: Suggestion[]) =>
            arr.findIndex((x) => x.name + x.country === s.name + s.country) === i,
        );
        setSuggestions(filtered);
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(city: string) {
    setQuery("");
    setShowSuggestions(false);
    onSelect(city);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      onSelect(query.trim());
      setQuery("");
      setShowSuggestions(false);
    }
  }

  function highlightMatch(text: string, queryStr: string) {
    if (!queryStr) return text;
    const idx = text.toLowerCase().indexOf(queryStr.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="font-semibold text-white">{text.slice(idx, idx + queryStr.length)}</span>
        {text.slice(idx + queryStr.length)}
      </>
    );
  }

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/10 bg-white/15 px-4 py-2.5 pl-10 text-sm text-white placeholder-white/50 backdrop-blur-md outline-none transition-all focus:border-white/25 focus:bg-white/20 focus:shadow-lg focus:shadow-white/5"
        />
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" size={15} />
        {loading && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/20 border-t-white/60" />
          </div>
        )}
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-white/10 bg-black/60 backdrop-blur-2xl shadow-2xl">
          {suggestions.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelect(`${s.name}, ${s.country}`)}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-white/80 transition-colors hover:bg-white/10"
            >
              <FiSearch size={13} className="shrink-0 text-white/30" />
              <span>
                {highlightMatch(s.name, query)},{" "}
                <span className="text-white/50">{s.country}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
