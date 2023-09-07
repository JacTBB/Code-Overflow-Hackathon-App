import { Tabs, Redirect } from "expo-router";
import { Entypo, Foundation, FontAwesome5, Ionicons } from '@expo/vector-icons';

import { useAuth } from '../../auth/auth';



const Color = 'rgb(80, 80, 80)'

export default function TabLayout() {
  // @ts-ignore
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs screenOptions={{
      tabBarStyle: { position: 'absolute', backgroundColor: '#fff' },
    }}>
      <Tabs.Screen name="home" options={{
        title: 'Home',
        tabBarLabelStyle: {
          color: Color,
        },
        tabBarIcon: ({ color, size }) => (
          <Entypo name="home" color={Color} size={size} />
        ),
      }} />
      <Tabs.Screen name="steps" options={{
        title: 'Steps',
        tabBarLabelStyle: {
          color: Color,
        },
        tabBarIcon: ({ color, size }) => (
          <Foundation name="foot" color={Color} size={size} />
        ),
      }} />
      <Tabs.Screen name="quests" options={{
        title: 'Quests',
        tabBarLabelStyle: {
          color: Color,
        },
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="scroll" color={Color} size={size-2} />
        ),
      }} />
      <Tabs.Screen name="profile" options={{
        title: 'Profile',
        tabBarLabelStyle: {
          color: Color,
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" color={Color} size={size-2} />
        ),
      }} />
    </Tabs>
  );
}
