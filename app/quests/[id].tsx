import { Stack, useGlobalSearchParams, Link, useNavigation } from 'expo-router';
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { QuestsDataType, QuestsData } from "../../components/QuestsData";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Quest() {
  const { id } = useGlobalSearchParams();
  const Navigation = useNavigation()
  const QuestData = QuestsData[`${id}`]
  const [MyQuest, setMyQuest] = useState('false')
  const [completedQuest, setCompletedQuest] = useState('false')
  
  useEffect(() => {
    (async () => {
      const MyQuestsDataString: any = await AsyncStorage.getItem('MyQuests')
      const MyQuestsData = MyQuestsDataString ? JSON.parse(MyQuestsDataString) : []
      setMyQuest(MyQuestsData[`${id}`] ? 'true': 'false')

      const CompletedQuestsString: any = await AsyncStorage.getItem('CompletedQuests')
      const CompletedQuests = CompletedQuestsString ? JSON.parse(CompletedQuestsString) : {}
      setCompletedQuest(CompletedQuests[`${id}`] ? 'true' : 'false')
    })()
  });

  async function GetQuest() {
    var MyQuestsDataString: any = await AsyncStorage.getItem('MyQuests')
    var MyQuestsData = MyQuestsDataString ? JSON.parse(MyQuestsDataString) : []
    MyQuestsData.push(id)
    MyQuestsDataString = JSON.stringify(MyQuestsData)
    await AsyncStorage.setItem('MyQuests', MyQuestsDataString)
    Navigation.goBack()
  }

  if (MyQuest == 'false') {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: QuestData.title }} />

        <Text>Quest Info page!</Text>
        <Text>QuestId: {QuestData.id}</Text>
        <Text>Title: {QuestData.title}</Text>
        <Text>Description: {QuestData.description}</Text>
        <Text>Duration: {QuestData.estimated_duration}</Text>
        <Text>Tasks Type: {QuestData.tasks_type}</Text>
        <Text>Tasks: {QuestData.tasks}</Text>
        <Pressable style={styles.TaskButton} onPress={GetQuest}>
          <Text>Get Quest</Text>
        </Pressable>

        <StatusBar style="auto" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: QuestData.title }} />

      <Text>Quest Info page!</Text>
      <Text>QuestId: {QuestData.id}</Text>
      <Text>Title: {QuestData.title}</Text>
      <Text>Description: {QuestData.description}</Text>
      <Text>Duration: {QuestData.estimated_duration}</Text>
      <Text>Tasks Type: {QuestData.tasks_type}</Text>
      <Text>Tasks: {QuestData.tasks}</Text>
      <Text>Completed: {completedQuest}</Text>
      <Link href={'/quests/workout/'+QuestData.id+'?task=0'} style={styles.TaskButton}>Begin Short Tasks</Link>

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

  TaskButton: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  }
});