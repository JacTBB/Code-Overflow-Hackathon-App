import { Stack, Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../../auth/auth";

export default function Profile() {
  // @ts-ignore
  const { logout } = useAuth();

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

      <Text style={{ color: "white" }}>Profile page!</Text>

      <Text
        onPress={() => {
          logout();
        }}
      >
        Sign Out
      </Text>
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
});