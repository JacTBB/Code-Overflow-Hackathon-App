// UNFINISHED
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import PocketBase from "pocketbase";

export default function Login() {
  const pb = new PocketBase("127.0.0.1:8090");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const authData = await pb.admins.authWithPassword(
      "test@example.com",
      "1234567890"
    );
  };

  return (
    <View>
      <Text>Login screen</Text>
      <TextInput placeholder="Email" onChangeText={(text) => setEmail(text)} />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
    </View>
  );
}

const styles = StyleSheet.create({});
