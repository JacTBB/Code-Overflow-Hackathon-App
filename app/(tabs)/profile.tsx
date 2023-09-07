import { Stack } from "expo-router";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../../auth/auth";
import PocketBase from "pocketbase";
import { useState } from "react";

export default function Profile() {
  const pb = new PocketBase("https://pocketbase-codeoverflow.jactbb.com");

  // @ts-ignore
  const { logout, user } = useAuth();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#78BB7B" },
          headerTintColor: "#293241",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: "FitQuest - Profile",
        }}
      />

      <Pressable
        style={styles.pressable}
        onPress={() => {
          logout();
        }}
      >
        <Text>Sign Out</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
  },
  pressable: {
    backgroundColor: "#78BB7B",
    padding: 15,
  },
});
