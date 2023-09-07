import { Link } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAuth } from "../../auth/auth";

export default function Register() {
  // @ts-ignore
  const { register } = useAuth();

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
            register(email, password);
          }}
        >
          <Text>Register</Text>
        </Pressable>
        <Pressable style={styles.pressable}>
          <Link href="/login">Go back to login</Link>
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
