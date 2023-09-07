import { Slot } from 'expo-router';
import { SessionProvider } from '../auth/auth';

export default function RootLayout() {
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
