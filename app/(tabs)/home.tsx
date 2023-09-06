import { Stack } from 'expo-router';
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Pedometer } from "expo-sensors";
import CircularProgress from "react-native-circular-progress-indicator";



export default function Index() {
  const [PedomaterAvailability, SetPedomaterAvailability] = useState("");
  const [StepCount, SetStepCount] = useState(0);

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
      <Text style={{fontSize: 40}}>Summary</Text>

      <View>
        <Text style={{fontSize: 30}}>Activity</Text>

        {/* FIXME: Over step goal overflows progress bar */}
        <CircularProgress
          value={StepCount}
          maxValue={StepGoal}
          radius={180}
          duration={1000}
          activeStrokeColor={"#26c010"}
          inActiveStrokeColor={"#343434"}
          inActiveStrokeOpacity={0.5}
          inActiveStrokeWidth={40}
          activeStrokeWidth={40}
          title={"Steps"}
          titleColor={"#000"}
          titleStyle={{ fontWeight: "bold" }}
          titleFontSize={30}
        />
      </View>

      <Text>Open up App.tsx to start working on your app!!</Text>

      <StatusBar style="auto" />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});