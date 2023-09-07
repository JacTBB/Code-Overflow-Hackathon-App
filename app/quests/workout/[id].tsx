import { Stack, useGlobalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Audio } from 'expo-av';
import { QuestsDataType, QuestsData } from "../../../components/QuestsData";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Workout() {
  const { id, task } = useGlobalSearchParams();
  const Navigation = useNavigation()
  const QuestData = QuestsData[`${id}`];
  const TotalTasks = QuestData.tasks.filter((t: any) => t[0] != 'rest').length;
  const [taskId_NoRest, setTaskId_NoRest] = useState(0);
  const [taskId, setTaskId] = useState(Number(task));
  const [timeLeft, setTimeLeft] = useState(QuestData.tasks[`${taskId}`][1]);
  const [completed, setCompleted] = useState(0)

  async function playWorkoutSound() {
    const { sound } = await Audio.Sound.createAsync( require('../../../assets/audio/beep.wav')
    );
    await sound.playAsync();
  }

  useEffect(() => {
    if (((taskId+1) >= QuestData.tasks.length)&&(timeLeft == 0)) {
      setTimeout(async () => {
        var CompletedQuestsString: any = await AsyncStorage.getItem('CompletedQuests')
        var CompletedQuests = CompletedQuestsString ? JSON.parse(CompletedQuestsString) : {}
        CompletedQuests[`${id}`] = 'true'
        CompletedQuestsString = JSON.stringify(CompletedQuests)
        await AsyncStorage.setItem('CompletedQuests', CompletedQuestsString)
        setCompleted(1)
      }, 3000);
      return
    }
    else {
      setCompleted(0)
    }

    const intervalId = setInterval(() => {
      if (timeLeft <= 0) {
        // if (QuestData.tasks_type == 'short') {
          if ((taskId+1) >= QuestData.tasks.length) return
          setTaskId(taskId+1)
          setTimeLeft(QuestData.tasks[`${taskId+1}`][1])
          if (QuestData.tasks[`${taskId+1}`][0] != 'rest') {
            setTaskId_NoRest(taskId_NoRest+1)
          }
          (async () => {
            // @ts-ignore
            playWorkoutSound()
          })()
        // }
      }
      else {
        setTimeLeft(timeLeft - 1);
      }
    }, 1);
    return () => clearInterval(intervalId);
  });

  if (((taskId+1) >= QuestData.tasks.length)&&(timeLeft == 0)) {
    if (completed == 1) Navigation.goBack()

    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: QuestData.title }} />

        <Text style={{fontSize: 30}}>{QuestData.title}</Text>
        <Text>Task: {Number(taskId_NoRest)+1}/{TotalTasks}</Text>
        <Text>Quest Completed!</Text>
        <Text>Redirecting...</Text>

        <StatusBar style="auto" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: QuestData.title }} />

      <Text style={{fontSize: 30}}>{QuestData.title}</Text>
      <Text>Task: {Number(taskId_NoRest)+1}/{TotalTasks}</Text>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 20}}>{QuestData.tasks[`${taskId}`][0]}</Text>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>{timeLeft} seconds</Text>

      <StatusBar style="auto" />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});