import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  reverseGeocodeAsync,
} from "expo-location";
import { useEffect, useState } from "react";

export function useLocation() {
  const [city, setCity] = useState<String | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getCurrentLoc() {
      let { status } = await requestForegroundPermissionsAsync();
      let location = await getCurrentPositionAsync({});
      const place = await reverseGeocodeAsync({
        latitude: Number(location?.coords.latitude),
        longitude: Number(location?.coords.longitude),
      });
      place.find((p) => setCity(p.city));
      setLoading(false)
    }
    getCurrentLoc();
  }, []);
  return {city, loading}
}