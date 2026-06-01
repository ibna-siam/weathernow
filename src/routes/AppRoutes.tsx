import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Favorites from "../pages/Favorites/Favorites";
import Settings from "../pages/Settings/Settings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}
