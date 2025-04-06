import { View, Text } from "react-native";

export default function SendBubble({message, color}: {message: string, color: string}) {
  return (
    <View
      style={{
        backgroundColor: color,
        padding: 10,
        borderRadius: 10,
        alignSelf: "flex-end",
        margin: 5,
      }}
    >
      <Text style={{ color: "white" }}>{message}</Text>
    </View>
  );
}
