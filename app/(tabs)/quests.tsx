import { Stack, Link, useFocusEffect } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { QuestsDataType, QuestsData } from "../../components/QuestsData";
import AsyncStorage from "@react-native-async-storage/async-storage";

type QuestProps = {
  Quest: QuestsDataType;
};

const MyQuest = ({ Quest }: QuestProps) => (
  <View style={styles.QuestCard}>
    <ImageBackground
      source={{ uri: Quest.card_image }}
      style={styles.QuestImage}
      imageStyle={{ borderRadius: 10, opacity: 0.8 }}
    >
      <Text style={styles.QuestTitle}>{Quest.title}</Text>
      <Link href={"/quests/" + Quest.id} style={styles.QuestButton}>
        Continue
      </Link>
    </ImageBackground>
  </View>
);

const FindQuest = ({ Quest }: QuestProps) => (
  <View style={styles.QuestCard}>
    <ImageBackground
      source={{ uri: Quest.card_image }}
      style={styles.QuestImage}
      imageStyle={{ borderRadius: 10, opacity: 0.8 }}
    >
      <Text style={styles.QuestTitle}>{Quest.title}</Text>
      <Link href={"/quests/" + Quest.id} style={styles.QuestButton}>
        View
      </Link>
    </ImageBackground>
  </View>
);

export default function Quests() {
  const [MyQuestsStorageString, setMyQuestsStorageString] = useState("");

  useFocusEffect(() => {
    (async () => {
      const MyQuestsStorageStringData = await AsyncStorage.getItem("MyQuests");
      setMyQuestsStorageString(
        `${MyQuestsStorageStringData ? MyQuestsStorageStringData : ""}`
      );
    })();
  });

  const MyQuestsStorage = MyQuestsStorageString
    ? JSON.parse(MyQuestsStorageString)
    : [];
  const MyQuestsData = [];
  const FindQuestsData = [];
  for (const Quest in QuestsData) {
    if (MyQuestsStorage[`${Quest}`]) {
      MyQuestsData.push(QuestsData[Quest]);
    } else {
      FindQuestsData.push(QuestsData[Quest]);
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#78BB7B" },
          headerTintColor: "#293241",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: "FitQuest - Quests",
        }}
      />

      <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
        My Quests
      </Text>
      <FlatList
        data={MyQuestsData}
        renderItem={({ item }) => <MyQuest Quest={item} />}
      />

      <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
        Find Quests
      </Text>
      <FlatList
        data={FindQuestsData}
        renderItem={({ item }) => <FindQuest Quest={item} />}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    paddingHorizontal: 10,
    paddingBottom: 60,
  },

  QuestImage: {
    flex: 1,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
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
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },

  QuestButton: {
    alignSelf: "flex-end",
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    width: 100,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    fontWeight: "bold",
  },
});
