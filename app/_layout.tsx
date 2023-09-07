import { Slot } from 'expo-router';
import { AuthProvider } from '../auth/auth';

export default function Root() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
