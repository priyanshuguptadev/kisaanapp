import { TouchableOpacity, Text } from "react-native";
import React from "react";

export default function SettingCard({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: "100%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
      }}
    >
      {icon}
      <Text style={{ fontSize: 16, color: "gray" }}>{label}</Text>
    </TouchableOpacity>
  );
}
