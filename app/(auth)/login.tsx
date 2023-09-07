import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";

import { useAuth } from "../../auth/auth";

export default function Login() {
  // @ts-ignore
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text>Login screen</Text>
      <TextInput placeholder="Email" onChangeText={(text) => setEmail(text)} />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Pressable
        onPress={() => {
          login(email, password);
        }}
      >
        <Text>Login</Text>
      </Pressable>
      <Link href="/register">Register</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
