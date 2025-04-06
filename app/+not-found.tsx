import { Text, View } from "react-native";

export default function NotFound() {
  return (
    <View style={{backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Text>Error 404 Page Not found!</Text>
    </View>
  )
}