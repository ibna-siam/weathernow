import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const pageGradients: Record<string, string> = {
  "/": "from-blue-500 via-blue-600 to-indigo-900",
  "/favorites": "from-indigo-600 via-purple-700 to-slate-900",
  "/settings": "from-slate-700 via-slate-800 to-gray-900",
};

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const darkMode = useSelector((s: RootState) => s.settings.darkMode);
  const gradient = pageGradients[location.pathname] || "from-blue-500 via-blue-600 to-indigo-900";

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${gradient} transition-all duration-700 ${darkMode ? "brightness-[0.6] saturate-50" : ""}`}
    >
      <div className="relative min-h-screen">
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.04),transparent_50%)]" />
        <Header />
        <main className="relative mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
