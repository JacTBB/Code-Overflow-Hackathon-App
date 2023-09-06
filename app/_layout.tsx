import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from "react-native";



export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    </Stack>
  );
}