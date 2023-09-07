import { Redirect, Stack } from "expo-router";

import { useSession } from "../auth/auth";

export default function StartPage() {
  const { session } = useSession();

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
