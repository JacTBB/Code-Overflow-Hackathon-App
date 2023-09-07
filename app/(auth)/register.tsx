import { useState } from "react";
import PocketBase from "pocketbase";
import { router } from "expo-router";
import { Text, TextInput, View } from "react-native";

export default function Register() {
  const pb = new PocketBase("https://pocketbase-codeoverflow.jactbb.com");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (email: string, password: string) => {
    try {
      await pb.collection("users").create({
        email,
        password,
        passwordConfirm: password,
      });

      try {
        await pb.collection("users").requestVerification(email);
      } catch (error) { }
    } catch (error) { }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput placeholder="Email" onChangeText={(text) => setEmail(text)} />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <Text onPress={() => router.replace("/login")}>Back</Text>
      <Text
        onPress={() => {
          handleRegister(email, password);
        }}
      >
        Register
      </Text>
    </View>
  );
}
