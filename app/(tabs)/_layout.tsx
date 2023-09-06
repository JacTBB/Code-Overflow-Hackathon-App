import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Entypo, Foundation, FontAwesome5, Ionicons } from '@expo/vector-icons';



export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarStyle: { position: 'absolute', backgroundColor: '#CDE5D7' },
    }}>
      <Tabs.Screen name="home" options={{
        title: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Entypo name="home" color={color} size={size} />
        ),
      }} />
      <Tabs.Screen name="steps" options={{
        title: 'Steps',
        tabBarIcon: ({ color, size }) => (
          <Foundation name="foot" color={color} size={size} />
        ),
      }} />
      <Tabs.Screen name="quests" options={{
        title: 'Quests',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="scroll" color={color} size={size-2} />
        ),
      }} />
      <Tabs.Screen name="profile" options={{
        title: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" color={color} size={size-2} />
        ),
      }} />
    </Tabs>
  );
}
