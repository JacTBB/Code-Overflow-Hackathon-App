import { Stack, useGlobalSearchParams, Link } from 'expo-router';
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { QuestsDataType, QuestsData } from "../../components/QuestsData";



export default function Quest() {
  const { id } = useGlobalSearchParams();
  const QuestData = QuestsData[`${id}`]

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