import { Stack } from 'expo-router';
import { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Pedometer } from "expo-sensors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PaperProvider, ProgressBar } from 'react-native-paper';
import CircularProgress from "react-native-circular-progress-indicator";



export default function Steps() {
  const [PedomaterAvailability, SetPedomaterAvailability] = useState("");
  const [StepCount, SetStepCount] = useState(0);
  const [PreviousStepCount, SetPreviousStepCount] = useState(0);
  const [SessionStepCount, SetSessionStepCount] = useState(0);

  var SaveStepsTimeout: any
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
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: '#78BB7B' },
          headerTintColor: '#293241',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: "FitQuest - Steps",
        }}
      />

      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ color: 'white' }}>
          Is Pedometer available on the device : {PedomaterAvailability}
        </Text>
      </View>

      <View style={{ flex: 3 }}>
        {/* FIXME: Over step goal overflows progress bar */}
        <CircularProgress
          value={StepCount}
          maxValue={StepGoal}
          radius={150}
          duration={1000}
          activeStrokeColor={"#26c010"}
          inActiveStrokeColor={"#343434"}
          inActiveStrokeOpacity={0.5}
          inActiveStrokeWidth={40}
          activeStrokeWidth={40}
          title={"Steps"}
          titleColor={"white"}
          titleStyle={{ fontWeight: "bold" }}
          titleFontSize={30}
        />
      </View>

      <View style={{ flex: 1 }}>
        <PaperProvider>
          <Text style={{ color: 'white' }}>6 September 2023</Text>
          <ProgressBar progress={0.5} color="#26c010" />
        </PaperProvider>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ color: 'white' }}>
          Target : {StepGoal} steps ({(StepGoal / 1300).toFixed(1)} km)
        </Text>

        <Text style={{ color: 'white' }}>
          Distance Covered : {DistanceCovered} km
        </Text>

        <Text style={{ color: 'white' }}>
          Calories Burnt : {caloriesBurnt}
        </Text>
      </View>

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