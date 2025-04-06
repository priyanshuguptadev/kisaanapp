import { ReactNode } from "react";
import { Text, TouchableOpacity } from "react-native";

export default function PrimaryButton({ label, onPress }: { label: ReactNode, onPress?:()=>void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: "100%",
        backgroundColor: "steelblue",
        padding: 20,
        marginTop: 20,
        borderRadius: 10,
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
