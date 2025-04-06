import { ActivityIndicator, Text, View } from "react-native";
import { useLocation } from "@/hooks/useLocation";

export default function Location() {
  const { city, loading } = useLocation();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View>
        {
          loading?
          <ActivityIndicator size={'large'} color={'steelblue'} /> :
          <Text style={{ fontSize: 24 }}>{city}</Text>
        }
      </View>
    </View>
  );
}
