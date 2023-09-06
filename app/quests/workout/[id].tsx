import { Stack, useGlobalSearchParams, Redirect } from 'expo-router';
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { QuestsDataType, QuestsData } from "../../../components/QuestsData";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Workout() {
  const { id, task } = useGlobalSearchParams();
  const QuestData = QuestsData[`${id}`];
  const TotalTasks = QuestData.tasks.filter((t: any) => t[0] != 'rest').length;
  const [taskId_NoRest, setTaskId_NoRest] = useState(0);
  const [taskId, setTaskId] = useState(Number(task));
  const [timeLeft, setTimeLeft] = useState(QuestData.tasks[`${taskId}`][1]);
  const [completed, setCompleted] = useState(0)

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

    const intervalId = setInterval(() => {
      if (timeLeft <= 0) {
        // if (QuestData.tasks_type == 'short') {
          if ((taskId+1) >= QuestData.tasks.length) return
          setTaskId(taskId+1)
          setTimeLeft(QuestData.tasks[`${taskId+1}`][1])
          if (QuestData.tasks[`${taskId+1}`][0] != 'rest') {
            setTaskId_NoRest(taskId_NoRest+1)
          }
        // }
      }
      else {
        setTimeLeft(timeLeft - 1);
      }
    }, 1);
    return () => clearInterval(intervalId);
  });

  if (((taskId+1) >= QuestData.tasks.length)&&(timeLeft == 0)) {
    if (completed == 1) return <Redirect href={'/quests/'+id} />

    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: QuestData.title }} />

        <Text>Task Doing page!</Text>
        <Text>Title: {QuestData.title}</Text>
        <Text>Tasks Type: {QuestData.tasks_type}</Text>
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

      <Text>Task Doing page!</Text>
      <Text>Title: {QuestData.title}</Text>
      <Text>Tasks Type: {QuestData.tasks_type}</Text>
      <Text>Task: {Number(taskId_NoRest)+1}/{TotalTasks}</Text>
      <Text>Task Title: {QuestData.tasks[`${taskId}`][0]}</Text>
      <Text>Task Total Seconds: {QuestData.tasks[`${taskId}`][1]}</Text>
      <Text>Task Remaining Seconds: {timeLeft}</Text>

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