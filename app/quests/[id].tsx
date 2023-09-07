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

  var ButtonText = "Begin Workout"
  if (completedQuest == 'Yes') {
    ButtonText = "Redo Workout"
  }
  
  useEffect(() => {
    (async () => {
      const MyQuestsDataString: any = await AsyncStorage.getItem('MyQuests')
      const MyQuestsData = MyQuestsDataString ? JSON.parse(MyQuestsDataString) : []
      setMyQuest(MyQuestsData[`${id}`] ? 'true': 'false')

      const CompletedQuestsString: any = await AsyncStorage.getItem('CompletedQuests')
      const CompletedQuests = CompletedQuestsString ? JSON.parse(CompletedQuestsString) : {}
      setCompletedQuest(CompletedQuests[`${id}`] ? 'Yes' : 'No')
    })()
  });

  async function GetQuest() {
    var MyQuestsDataString: any = await AsyncStorage.getItem('MyQuests')
    var MyQuestsData = MyQuestsDataString ? JSON.parse(MyQuestsDataString) : []
    MyQuestsData.push(id)
    console.log(MyQuestsData)
    MyQuestsDataString = JSON.stringify(MyQuestsData)
    await AsyncStorage.setItem('MyQuests', MyQuestsDataString)
    Navigation.goBack()
  }

  if (MyQuest == 'false') {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: QuestData.title }} />

        <Text style={{fontSize: 30}}>{QuestData.title}</Text>
        <Text>Duration: {QuestData.estimated_duration}</Text>
        <Text style={{margin: 10}}>{QuestData.description}</Text>

        <Text style={{fontSize: 16, textDecorationLine: 'underline'}}>Tasks</Text>
        {QuestData.tasks.map((Quest: any) => (
          <Text>{Quest[0]} - {Quest[1]} secs</Text>
        ))}

        <View style={{flex: 1, flexDirection: 'row'}}>
          <Link href={'/quests'} style={styles.TaskButton}>Back</Link>
          <Pressable style={styles.TaskButton} onPress={GetQuest}>
            <Text>Get Quest</Text>
          </Pressable>
        </View>

        <StatusBar style="auto" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: QuestData.title }} />

      <Text style={{fontSize: 30}}>{QuestData.title}</Text>
      <Text>Duration: {QuestData.estimated_duration}</Text>
      <Text style={{margin: 10}}>{QuestData.description}</Text>

      <Text style={{fontSize: 16, textDecorationLine: 'underline'}}>Tasks</Text>
      {QuestData.tasks.map((Quest: any) => (
        <Text>{Quest[0]} - {Quest[1]} secs</Text>
      ))}

      <Text style={{margin: 10}}>Completed: {completedQuest}</Text>

      <View style={{flex: 1, flexDirection: 'row'}}>
        <Link href={'/quests'} style={styles.TaskButton}>Back</Link>
        <Link href={'/quests/workout/'+QuestData.id+'?task=0'} style={styles.TaskButton}>{ButtonText}</Link>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    backgroundColor: "#fff",
  },

  TaskButton: {
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    borderRadius: 10,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    textAlign: 'center',
  }
});