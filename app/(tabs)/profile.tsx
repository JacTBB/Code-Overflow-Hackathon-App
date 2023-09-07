import { Stack } from "expo-router";
import { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../../auth/auth";
import PocketBase from "pocketbase";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const pb = new PocketBase("https://pocketbase-codeoverflow.jactbb.com");

  // @ts-ignore
  const { logout, user } = useAuth();
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

      <Text style={{color: 'white', fontSize: 20}}>Quest Points: {points}</Text>

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