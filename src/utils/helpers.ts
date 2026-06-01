export function getAQIInfo(aqi: number): { label: string; color: string } {
  if (aqi <= 50) return { label: "Good", color: "text-green-400" };
  if (aqi <= 100) return { label: "Moderate", color: "text-yellow-400" };
  if (aqi <= 150) return { label: "Unhealthy for Sensitive Groups", color: "text-orange-400" };
  if (aqi <= 200) return { label: "Unhealthy", color: "text-red-400" };
  if (aqi <= 300) return { label: "Very Unhealthy", color: "text-purple-400" };
  return { label: "Hazardous", color: "text-rose-800" };
}

export function getWeatherGradient(condition: string, isDay: boolean): string {
  const lower = condition.toLowerCase();
  if (lower.includes("sunny") || lower.includes("clear")) {
    return isDay ? "from-amber-400 via-orange-300 to-sky-400" : "from-indigo-900 via-purple-800 to-blue-900";
  }
  if (lower.includes("partly cloudy")) {
    return "from-blue-400 via-blue-300 to-gray-300";
  }
  if (lower.includes("cloudy") || lower.includes("overcast")) {
    return "from-gray-400 via-gray-500 to-gray-600";
  }
  if (lower.includes("mist") || lower.includes("fog")) {
    return "from-gray-300 via-gray-400 to-gray-500";
  }
  if (lower.includes("rain") || lower.includes("drizzle")) {
    return "from-blue-600 via-blue-700 to-gray-800";
  }
  if (lower.includes("thunder") || lower.includes("storm")) {
    return "from-gray-700 via-purple-800 to-gray-900";
  }
  if (lower.includes("snow") || lower.includes("ice")) {
    return "from-blue-100 via-white to-gray-200";
  }
  return isDay ? "from-blue-400 via-blue-500 to-blue-600" : "from-gray-700 via-gray-800 to-gray-900";
}

export function formatTemp(tempC: number, unit: "celsius" | "fahrenheit"): number {
  if (unit === "fahrenheit") return Math.round(tempC * 9 / 5 + 32);
  return Math.round(tempC);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
}

export function getTimeFromEpoch(epoch: number): string {
  const date = new Date(epoch * 1000);
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}
