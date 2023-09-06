import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Pedometer } from "expo-sensors";
import CircularProgress from "react-native-circular-progress-indicator";



export default function Steps() {
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
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>
          Is Pedometer available on the device : {PedomaterAvailability}
        </Text>
      </View>

      <View style={{ flex: 3 }}>
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

      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ flex: 1 }}>
          <Text>
            Target : {StepGoal} steps ({(StepGoal / 1300).toFixed(1)} km)
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text>
            Distance Covered : {DistanceCovered} km
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text>
            Calories Burnt : {caloriesBurnt}
          </Text>
        </View>
      </View>

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