import { View, Text } from "react-native";
// import { Dropdown } from "react-native-element-dropdown";
import RNPickerSelect from "react-native-picker-select";

interface Data {
  label: string;
  value: string;
}

export default function InfoDropDown({
  label,
  data,
  onChange,
}: {
  label: string;
  data: Data[];
  onChange: (val: Data) => void;
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
      <RNPickerSelect
        onValueChange={onChange}
        items={data}
      />
      {/* <Dropdown
        data={data}
        labelField={"label"}
        valueField={"value"}
        onChange={onChange}
        style={{
          width: "100%",
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 10,
          marginTop: 10,
        }}
      /> */}
    </View>
  );
}
