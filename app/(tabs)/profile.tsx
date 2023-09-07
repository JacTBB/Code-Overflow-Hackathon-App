import { Stack, Link } from 'expo-router';
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";



export default function Profile() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: '#78BB7B' },
          headerTintColor: '#293241',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: "FitQuest - Profile",
        }}
      />

      <Text style={{ color: 'white' }}>Profile page!</Text>

      <Link href={'/login'} style={{ color: 'white', borderWidth: 1, borderColor: 'white', margin: 5, padding: 5 }}>Login</Link>

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