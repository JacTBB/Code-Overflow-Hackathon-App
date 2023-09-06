// UNFINISHED
import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";

import PocketBase from "pocketbase";

export default function Login() {
  const pb = new PocketBase("https://pocketbase-codeoverflow.jactbb.com");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const authData = await pb.admins.authWithPassword(
      "codeoverflow@jactbb.com",
      "felix@punggol!"
    );
    console.log(authData)
    console.log(pb.authStore.isValid);
    console.log(pb.authStore);
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
      <Pressable onPress={handleLogin}>
        <Text>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
