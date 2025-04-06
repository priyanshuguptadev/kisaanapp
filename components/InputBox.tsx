import { TextInput } from "react-native";

export default function InputBox({placeholder, isPassword, onChangeText}: {
  placeholder: string,
  isPassword?: boolean,
  onChangeText?: (p: string)=>void
}) {
  return (
    <TextInput
      onChangeText={onChangeText}
      cursorColor={"steelblue"}
      secureTextEntry={isPassword}
      placeholder={placeholder}
      style={{
        width: "100%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        marginTop: 10,
      }}
    />
  );
}
