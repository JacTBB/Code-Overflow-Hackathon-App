import { Stack, Link, useFocusEffect  } from 'expo-router';
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { QuestsDataType, QuestsData } from "../../components/QuestsData";
import AsyncStorage from '@react-native-async-storage/async-storage';



type QuestProps = {
  Quest: QuestsDataType
};

const MyQuest = ({Quest}: QuestProps) => (
  <View style={styles.QuestCard}>
    <Text>{Quest.title}</Text>
    <Text>{Quest.card_image}</Text>
    <Link href={'/quests/'+Quest.id} style={styles.QuestButton}>Continue</Link>
  </View>
);

const FindQuest = ({Quest}: QuestProps) => (
  <View style={styles.QuestCard}>
    <Text>{Quest.title}</Text>
    <Text>{Quest.card_image}</Text>
    <Link href={'/quests/'+Quest.id} style={styles.QuestButton}>View</Link>
  </View>
);



export default function Quests() {
  const [MyQuestsStorageString, setMyQuestsStorageString] = useState('')
  
  useFocusEffect(() => {
    (async () => {
      const MyQuestsStorageStringData = await AsyncStorage.getItem('MyQuests')
      setMyQuestsStorageString(`${MyQuestsStorageStringData ? MyQuestsStorageStringData : ''}`)
    })()
  })

  const MyQuestsStorage = MyQuestsStorageString ? JSON.parse(MyQuestsStorageString) : []
  const MyQuestsData = []
  const FindQuestsData = []
  for (const Quest in QuestsData) {
    if (MyQuestsStorage[`${Quest}`]) {
      MyQuestsData.push(QuestsData[Quest])
    }
    else {
      FindQuestsData.push(QuestsData[Quest])
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30, fontWeight: 'bold'}}>My Quests</Text>
      <FlatList
        data={MyQuestsData}
        renderItem={({item}) => <MyQuest Quest={item} />}
      />
      
      <Text style={{fontSize: 30, fontWeight: 'bold'}}>Find Quests</Text>
      <FlatList
        data={FindQuestsData}
        renderItem={({item}) => <FindQuest Quest={item} />}
      />

      <StatusBar style="auto" />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },

  QuestCard: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#aaa",
    marginVertical: 3,
    padding: 10,
    borderRadius: 10,
  },

  QuestButton: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});