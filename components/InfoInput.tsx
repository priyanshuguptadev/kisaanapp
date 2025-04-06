import { Text, TextInput, View } from "react-native";

export default function InfoInput({
  placeholder,
  onChangeText,
  label,
}: {
  placeholder: string;
  onChangeText?: (p: string) => void;
  label?: string;
}) {
  return (
    <View>
      <Text
        style={{
          fontSize: 12,
          marginLeft: 3,
          color: "gray",
          marginTop: 10,
        }}
      >
        {label}
      </Text>
      <TextInput
        keyboardType="number-pad"
        onChangeText={onChangeText}
        cursorColor={"steelblue"}
        placeholder={"e.g. " + placeholder}
        style={{
          width: "100%",
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 10,
          marginTop: 10,
        }}
      />
    </View>
  );
}
