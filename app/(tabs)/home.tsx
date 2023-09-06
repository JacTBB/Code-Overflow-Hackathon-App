import { Stack } from 'expo-router';
import { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Pedometer } from "expo-sensors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CircularProgress from "react-native-circular-progress-indicator";



export default function Home() {
  const [PedomaterAvailability, SetPedomaterAvailability] = useState("");
  const [StepCount, SetStepCount] = useState(0);
  const [PreviousStepCount, SetPreviousStepCount] = useState(0);
  const [SessionStepCount, SetSessionStepCount] = useState(0);

  var SaveStepsTimeout: any
  const CurrentDate = new Date().toDateString()
  const StepGoal = 100
  var Dist = StepCount / 1300;
  var DistanceCovered: any = Dist.toFixed(2);
  var cal = DistanceCovered * 60;
  var caloriesBurnt = cal.toFixed(2);

  (async () => {
    if (PreviousStepCount == 0) {
      const StorageStepCount = (await AsyncStorage.getItem('StepCount')) || 0
      SetPreviousStepCount(Number(StorageStepCount))
      SetStepCount(Number(StorageStepCount))
    }
  })()

  useEffect(() => {
    function SaveSteps() {
      SaveStepsTimeout = setTimeout(async () => {
        await AsyncStorage.setItem('StepCount', (PreviousStepCount + SessionStepCount).toString())
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

  return (
    <View style={styles.container}>
      <Text style={{color: 'white', fontSize: 15}}>{CurrentDate}</Text>
      <Text style={{color: 'white', fontSize: 40}}>Summary</Text>

      <View style={{height: 300}}>
        <Text style={{color: 'white', fontSize: 30}}>Activity</Text>

        <View style={{flex: 1, alignItems: 'center'}}>
          {/* FIXME: Over step goal overflows progress bar */}
          <CircularProgress
            value={StepCount}
            maxValue={StepGoal}
            radius={120}
            duration={1000}
            activeStrokeColor={"#26c010"}
            inActiveStrokeColor={"#446444"}
            inActiveStrokeOpacity={0.5}
            inActiveStrokeWidth={40}
            activeStrokeWidth={40}
            title={"Steps"}
            titleColor={"white"}
            titleStyle={{ fontWeight: "bold" }}
            titleFontSize={30}
          />
        </View>
      </View>

      <View>
        <Text style={{color: 'white', fontSize: 30}}>Quests</Text>
        <Text style={{color: 'white'}}>Open up App.tsx to start working on your app!!</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingHorizontal: 10,
  },
});