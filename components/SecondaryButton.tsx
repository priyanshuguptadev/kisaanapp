import { Text, TouchableOpacity } from "react-native";

export default function SecondaryButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: "100%",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "steelblue",
        padding: 20,
        marginTop: 10,
        borderRadius: 10,
      }}
    >
      <Text
        style={{ color: "steelblue", fontWeight: "bold", textAlign: "center" }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
