import { Slot } from 'expo-router';
import { SessionProvider } from '../auth/auth';

export default function Root() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}