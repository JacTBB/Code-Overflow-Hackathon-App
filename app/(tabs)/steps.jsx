import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Pedometer } from "expo-sensors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CircularProgressBase } from "react-native-circular-progress-indicator";

import { useSession } from "../../components/StepContext";

// @ts-ignore
export var StepHistory = [["No Step History Found", 0]];

export default function Steps() {
  const [PedomaterAvailability, SetPedomaterAvailability] = useState("");
  const [StepHistoryString, setStepHistoryString] = useState("");

  const {
    // @ts-ignore
    StepCount,
    SetStepCount,
    // @ts-ignore
    PreviousStepCount,
    SetPreviousStepCount,
    // @ts-ignore
    SessionStepCount,
    SetSessionStepCount,
  } = useSession();

  const CurrentDate = new Date().toDateString();
  const StepGoal = 10000;
  const DistanceGoal = 10;
  const CalorieGoal = 300;
  var Dist = StepCount / 1300;
  var DistanceCovered = Dist.toFixed(2);
  var cal = DistanceCovered * 60;
  var caloriesBurnt = cal.toFixed(2);

  if (StepHistoryString != "") {
    StepHistory = JSON.parse(StepHistoryString);
  }

  (async () => {
    var StepHistoryStringData = [];
    const CurrentDate = new Date();

    function daysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    }
    for (var DaysRetrieved = 1; DaysRetrieved <= 10; DaysRetrieved++) {
      var Day = CurrentDate.getDate() - DaysRetrieved;
      var Month = CurrentDate.getMonth();
      if (Day <= 0) {
        Month -= 1;
        Day = daysInMonth(Month, CurrentDate.getFullYear()) + Day;
      }

      const DayStepCount =
        (await AsyncStorage.getItem(
          `StepCount-${CurrentDate.getFullYear()}-${Month}-${Day}`
        )) || 0;
      // @ts-ignore
      StepHistoryStringData.push([
        `${CurrentDate.getFullYear()}-${Month}-${Day}`,
        DayStepCount,
      ]);
    }

    setStepHistoryString(`${JSON.stringify(StepHistoryStringData)}`);
  })();

  useEffect(() => {
    Pedometer.watchStepCount((result) => { });

    Pedometer.isAvailableAsync().then(
      (result) => SetPedomaterAvailability(String(result)),
      (error) => SetPedomaterAvailability(error)
    );
  });

  const StepHistoryItems = ({ Item }) => (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <Text style={{ color: "white", width: 140 }}>
        {new Date(Item[0]).toDateString()}
      </Text>
      <Text style={{ color: "white", width: 120 }}>
        {Item[1]}/{StepGoal} Steps
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#78BB7B" },
          headerTintColor: "#293241",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: "FitQuest - Steps",
        }}
      />

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 50,
        }}
      >
        <View style={{ padding: 20 }}>
          <Text style={{ color: "#26c010", fontSize: 20 }}>Steps</Text>
          <Text style={{ color: "white" }}>
            {StepCount} / {StepGoal}
          </Text>

          <Text style={{ color: "#F14050", fontSize: 20 }}>Distance</Text>
          <Text style={{ color: "white" }}>
            {DistanceCovered} / {DistanceGoal} km
          </Text>

          <Text style={{ color: "#8ED1F1", fontSize: 20 }}>Calories</Text>
          <Text style={{ color: "white" }}>
            {caloriesBurnt} / {CalorieGoal} cal
          </Text>
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
            ></CircularProgressBase>
          </CircularProgressBase>
        </CircularProgressBase>
      </View>

      <View style={{ flex: 2 }}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          Past 10 days step history
        </Text>
        <FlatList
          data={StepHistory}
          renderItem={({ item }) => <StepHistoryItems Item={item} />}
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
    alignItems: "center",
    justifyContent: "center",
  },
});
