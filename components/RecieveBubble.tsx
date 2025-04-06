import { View, Text } from "react-native";

export default function RecieveBubble({message}: {message: string}) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        alignSelf: "flex-start",
        margin: 5,
      }}
    >
      <Text style={{ color: "gray" }}>{message}</Text>
    </View>
  );
}
