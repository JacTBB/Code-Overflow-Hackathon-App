import { Stack } from 'expo-router';
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Pedometer } from "expo-sensors";
import CircularProgress from "react-native-circular-progress-indicator";



export default function Index() {
  const [PedomaterAvailability, SetPedomaterAvailability] = useState("");
  const [StepCount, SetStepCount] = useState(0);

  const CurrentDate = new Date().toDateString()
  const StepGoal = 10
  var Dist = StepCount / 1300;
  var DistanceCovered: any = Dist.toFixed(2);
  var cal = DistanceCovered * 60;
  var caloriesBurnt = cal.toFixed(2);

  const subscribe = () => {
    Pedometer.watchStepCount((result) => {
      SetStepCount(result.steps);
    });

    Pedometer.isAvailableAsync().then(
      (result) => SetPedomaterAvailability(String(result)),
      (error) => SetPedomaterAvailability(error)
    );
  };

  useEffect(() => {
    subscribe();
  }, []);

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