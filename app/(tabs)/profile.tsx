import { Stack, Link } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../../auth/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Profile() {
  // @ts-ignore
  const { logout } = useAuth();
  const [points, setPoints] = useState(0)

  useEffect(() => {
    (async () => {
      var CompletedQuestsString: any = await AsyncStorage.getItem('CompletedQuests')
      var CompletedQuests = CompletedQuestsString ? JSON.parse(CompletedQuestsString) : {}
      var QuestPoints = 0
      for (const Quest in CompletedQuests) {
        QuestPoints += Number(CompletedQuests[Quest])
      }
      setPoints(QuestPoints)
    })()
  })

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

      <Text>Quest Points: {points}</Text>

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