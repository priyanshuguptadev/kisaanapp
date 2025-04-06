import EvilIcon from "@expo/vector-icons/EvilIcons";

import { useSignIn } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Text, View } from 'react-native'
import React from 'react'
import InputBox from "@/components/InputBox";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      <EvilIcon name="lock" size={108} color={"steelblue"} />
      <Text
        style={{
          color: "gray",
          fontWeight: "500",
          fontSize: 18,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        Login to your account.
      </Text>
      <InputBox
        placeholder="Enter email"
        onChangeText={(email) => setEmailAddress(email)}
      />
      <InputBox
        placeholder="Enter password"
        onChangeText={(password) => setPassword(password)}
        isPassword={true}
      />
      <PrimaryButton label="L O G I N" onPress={onSignInPress} />
      <SecondaryButton
        label="Go to SIGNUP"
        onPress={() => router.replace("/signup")}
      />
    </View>
  )
}