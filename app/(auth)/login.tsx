import { useState } from "react";
import PocketBase from "pocketbase";
import { router } from "expo-router";
import { Text, TextInput, View } from "react-native";

import { useSession } from "../../auth/auth";

export default function Login() {
  const pb = new PocketBase("https://pocketbase-codeoverflow.jactbb.com");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (email: string, password: string) => {
    const authData = await pb
      .collection("users")
      .authWithPassword(email, password);
    console.log(authData);
    console.log(pb.authStore.isValid);
    console.log(pb.authStore);
  };

  const { signIn } = useSession();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput placeholder="Email" onChangeText={(text) => setEmail(text)} />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <Text onPress={() => router.replace("/login")}>Register</Text>
      <Text
        onPress={() => {
          //signIn();
          handleLogin(email, password);
          //router.replace("/home");
        }}
      >
        Sign In
      </Text>
    </View>
  );
}
