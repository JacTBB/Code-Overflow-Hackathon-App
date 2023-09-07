import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { useAuth } from '../../auth/auth';

export default function Register() {
  // @ts-ignore
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text>Register screen</Text>
      <TextInput placeholder="Email" onChangeText={(text) => setEmail(text)} />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Pressable
        onPress={() => {
          register(email, password);
        }}
      >
        <Text>Register</Text>
      </Pressable>
      <Link href="/login">Go back to login</Link>
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
