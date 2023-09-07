import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import PocketBase from "pocketbase";

import { useSession } from '../../auth/auth';



export default function Login() {
  const pb = new PocketBase("https://pocketbase-codeoverflow.jactbb.com");

  // @ts-ignore
  const { signIn } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const authData = await pb.admins.authWithPassword(
      "codeoverflow@jactbb.com",
      "felix@punggol!"
    );
    console.log(authData);
    console.log(pb.authStore.isValid);
    console.log(pb.authStore);
    signIn();
    router.replace('/')
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
