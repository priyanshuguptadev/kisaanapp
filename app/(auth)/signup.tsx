import EvilIcon from "@expo/vector-icons/EvilIcons";
import * as React from "react";
import { Text, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import InputBox from "@/components/InputBox";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Text
          style={{
            color: "gray",
            fontWeight: "500",
            fontSize: 18,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          Verify your email
        </Text>
        <InputBox
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <PrimaryButton label="Verify" onPress={onVerifyPress} />
      </View>
    );
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
        Create a new account.
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
      <PrimaryButton label="S I G N U P" onPress={onSignUpPress} />
      <SecondaryButton
        label="Go to LOGIN"
        onPress={() => router.replace("/signin")}
      />
    </View>
  );
}
