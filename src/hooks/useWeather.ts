import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../services/weatherApi";

export function useWeather(city: string) {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeather(city),
    enabled: !!city,
    staleTime: 10 * 60 * 1000,
    retry: 2,
  });
}
