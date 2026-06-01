import { useState, useCallback } from "react";

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

export function useLocation() {
  const [state, setState] = useState<LocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: false,
  });

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState((prev) => ({ ...prev, error: "Geolocation is not supported by your browser" }));
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loading: false,
        });
      },
      (error) => {
        let message = "Failed to get location";
        if (error.code === error.PERMISSION_DENIED) {
          message = "Please allow location access";
        } else if (error.code === error.TIMEOUT) {
          message = "Location request timed out";
        }
        setState((prev) => ({ ...prev, error: message, loading: false }));
      },
      { enableHighAccuracy: false, timeout: 10000 },
    );
  }, []);

  return { ...state, getLocation };
}
