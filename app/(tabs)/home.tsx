import { Stack, Link } from 'expo-router';
import { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, FlatList, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Pedometer } from "expo-sensors";
import { QuestsDataType, QuestsData } from "../../components/QuestsData";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CircularProgressBase } from "react-native-circular-progress-indicator";

import { useSession } from '../../components/StepContext'



type QuestProps = {
  Quest: QuestsDataType
};

const MyQuest = ({Quest}: QuestProps) => (
  <View style={styles.QuestCard}>
    <ImageBackground source={{uri: Quest.card_image}} style={styles.QuestImage} imageStyle={{borderRadius: 10, opacity: 0.8}}>     
      <Text style={styles.QuestTitle}>{Quest.title}</Text>
      <Link href={'/quests/'+Quest.id} style={styles.QuestButton}>Continue</Link>
    </ImageBackground>
  </View>
);



export default function Home() {
  const [PedomaterAvailability, SetPedomaterAvailability] = useState("");
  const [MyQuestsStorageString, setMyQuestsStorageString] = useState('');

  const {
    // @ts-ignore
    StepCount, SetStepCount,
    // @ts-ignore
    PreviousStepCount, SetPreviousStepCount,
    // @ts-ignore
    SessionStepCount, SetSessionStepCount
  } = useSession()

  var SaveStepsTimeout: any
  const CurrentDate = new Date().toDateString()
  const StepGoal = 10000
  const DistanceGoal = 10
  const CalorieGoal = 300
  var Dist = StepCount / 1300;
  var DistanceCovered: any = Dist.toFixed(2);
  var cal = DistanceCovered * 60;
  var caloriesBurnt = cal.toFixed(2);

  (async () => {
    if (PreviousStepCount == 0) {
      const StorageStepCount = (await AsyncStorage.getItem('StepCount')) || 0
      SetPreviousStepCount(Number(StorageStepCount))
      SetStepCount(Number(StorageStepCount))

      const MyQuestsStorageStringData = await AsyncStorage.getItem('MyQuests')
      setMyQuestsStorageString(`${MyQuestsStorageStringData ? MyQuestsStorageStringData : ''}`)
    }
  })()

  useEffect(() => {
    function SaveSteps() {
      SaveStepsTimeout = setTimeout(async () => {
        await AsyncStorage.setItem('StepCount', (PreviousStepCount + SessionStepCount).toString())
        
        const CurrentDate = new Date()
        await AsyncStorage.setItem(`StepCount-${CurrentDate.getFullYear()}-${CurrentDate.getMonth()}-${CurrentDate.getDate()}`,
          (PreviousStepCount + SessionStepCount).toString()
        )
      }, 5000)
    }

    Pedometer.watchStepCount((result) => {
      SetSessionStepCount(result.steps)
      SetStepCount(PreviousStepCount + result.steps)
      clearTimeout(SaveStepsTimeout)
      SaveSteps()
    });

    Pedometer.isAvailableAsync().then(
      (result) => SetPedomaterAvailability(String(result)),
      (error) => SetPedomaterAvailability(error)
    );
  });

  const MyQuestsStorage = MyQuestsStorageString ? JSON.parse(MyQuestsStorageString) : []
  const MyQuestsData = []
  const FindQuestsData = []
  for (const Quest in QuestsData) {
    if (MyQuestsStorage.indexOf(QuestsData[Quest].id) >= 0) {
      MyQuestsData.push(QuestsData[Quest])
    }
    else {
      FindQuestsData.push(QuestsData[Quest])
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: '#78BB7B' },
          headerTintColor: '#293241',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: "FitQuest - Home",
        }}
      />

      <Text style={{color: 'white', fontSize: 15, paddingTop: 25}}>{CurrentDate}</Text>
      <Text style={{color: 'white', fontSize: 40}}>Summary</Text>

      <View style={{height: 300}}>
        <Text style={{color: 'white', fontSize: 30}}>Activity</Text>

        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{padding: 20}}>
            <Text style={{color: '#26c010', fontSize: 20}}>Steps</Text>
            <Text style={{color: 'white'}}>{StepCount} / {StepGoal}</Text>

            <Text style={{color: '#F14050', fontSize: 20}}>Distance</Text>
            <Text style={{color: 'white'}}>{DistanceCovered} / {DistanceGoal} km</Text>

            <Text style={{color: '#8ED1F1', fontSize: 20}}>Calories</Text>
            <Text style={{color: 'white'}}>{caloriesBurnt} / {CalorieGoal} cal</Text>
          </View>

          {/* FIXME: Over step goal overflows progress bar */}
          <CircularProgressBase
            value={StepCount}
            maxValue={StepGoal}
            radius={120}
            duration={1000}
            activeStrokeColor={"#26c010"}
            inActiveStrokeColor={"#446444"}
            inActiveStrokeOpacity={0.4}
            inActiveStrokeWidth={25}
            activeStrokeWidth={25}
          >
            <CircularProgressBase
              value={DistanceCovered}
              maxValue={DistanceGoal}
              radius={100}
              duration={1000}
              activeStrokeColor={"#F14050"}
              inActiveStrokeColor={"#F14050"}
              inActiveStrokeOpacity={0.4}
              inActiveStrokeWidth={25}
              activeStrokeWidth={25}
            >
              <CircularProgressBase
                value={Number(caloriesBurnt)}
                maxValue={CalorieGoal}
                radius={80}
                duration={1000}
                activeStrokeColor={"#8ED1F1"}
                inActiveStrokeColor={"#8ED1F1"}
                inActiveStrokeOpacity={0.4}
                inActiveStrokeWidth={25}
                activeStrokeWidth={25}
              >

              </CircularProgressBase>
            </CircularProgressBase>
          </CircularProgressBase>
        </View>
      </View>

      <View style={{height: 260}}>
        <Text style={{color: 'white', fontSize: 30}}>Quests</Text>
        <FlatList
          data={MyQuestsData}
          renderItem={({item}) => <MyQuest Quest={item} />}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    paddingHorizontal: 10,
  },

  QuestImage: {
    flex: 1,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
  },

  QuestCard: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 3,
    padding: 2,
    borderRadius: 10,
  },

  QuestTitle: {
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textShadowColor: 'gray',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
  },

  QuestButton: {
    alignSelf: 'flex-end',
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    width: 100,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});