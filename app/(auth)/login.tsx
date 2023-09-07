import { Link } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Image
} from "react-native";

import { useAuth } from "../../auth/auth";

export default function Login() {
  // @ts-ignore
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.view}>
        <Image
          style={styles.image}
          source={require("../../assets/images/fitquest.png")}
          resizeMode="contain"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Pressable
          style={styles.pressable}
          onPress={() => {
            login(email, password);
          }}
        >
          <Text>Login</Text>
        </Pressable>
        <Pressable style={styles.pressable}>
          <Link href="/register">Register</Link>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "80%",
  },
  textInput: {
    height: 40,
    width: "80%",
    padding: 12,
    margin: 5,
    backgroundColor: "#e6e7e8",
  },
  pressable: {
    height: 40,
    width: "80%",
    padding: 12,
    margin: 5,
    backgroundColor: "#78BB7B",
  },
});