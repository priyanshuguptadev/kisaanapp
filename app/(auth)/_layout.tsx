import { Redirect, Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@clerk/clerk-expo";

export default function AuthRoutesLayout() {
  // const { isSignedIn } = useAuth()
    
  //   if (isSignedIn) {
  //     return <Redirect href={'/'} />
  //   }
  
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="signin" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
