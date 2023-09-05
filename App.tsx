import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Pedometer } from "expo-sensors";
import CircularProgress from "react-native-circular-progress-indicator";



export default function App() {
  const [PedomaterAvailability, SetPedomaterAvailability] = useState("");
  const [StepCount, SetStepCount] = useState(0);

  var WindowHeight = Dimensions.get("window").height;
  var Dist = StepCount / 1300;
  var DistanceCovered: any = Dist.toFixed(4);
  var cal = DistanceCovered * 60;
  var caloriesBurnt = cal.toFixed(4);

  const subscribe = () => {
    const subscription = Pedometer.watchStepCount((result) => {
      SetStepCount(result.steps);
    });

    Pedometer.isAvailableAsync().then(
      (result) => {
        SetPedomaterAvailability(String(result));
      },
      (error) => {
        SetPedomaterAvailability(error);
      }
    );
  };

  React.useEffect(() => {
    subscribe();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require("./assets/splash.png")}
        resizeMode="cover"
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.headingDesign}>
            Is Pedometer available on the device : {PedomaterAvailability}
          </Text>
        </View>
        <View style={{ flex: 3 }}>
          <CircularProgress
            value={StepCount}
            maxValue={6500}
            radius={210}
            activeStrokeColor={"#f39c12"}
            inActiveStrokeColor={"#9b59b6"}
            inActiveStrokeOpacity={0.5}
            inActiveStrokeWidth={40}
            activeStrokeWidth={40}
            title={"Step Count"}
            titleColor={"#ecf0f1"}
            titleStyle={{ fontWeight: "bold" }}
          />
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.textDesign,
                { paddingLeft: 20, marginLeft: '23%' },
              ]}
            >
              Target : 6500 steps(5kms)
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.textDesign,
                { width: "93%", paddingLeft: 20, marginLeft: '-3.5%' },
              ]}
            >
              Distance Covered : {DistanceCovered} km
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.textDesign,
                { paddingLeft: 10, marginLeft: '23%' },
              ]}
            >
              Calories Burnt : {caloriesBurnt}
            </Text>
          </View>

          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  headingDesign: {
    backgroundColor: "rgba(155, 89, 182,0.5)",
    alignSelf: "center",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },

  textDesign: {
    backgroundColor: "rgba(155, 89, 182,0.5)",
    height: 50,
    width: '85%',
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
});