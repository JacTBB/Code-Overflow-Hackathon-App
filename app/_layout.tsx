import { Slot } from 'expo-router';
import { AuthProvider as AuthSessionProvider } from '../auth/auth';
import { SessionProvider as StepSessionProvider } from '../components/StepContext';

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs()

export default function Root() {
  return (
    <AuthSessionProvider>
      <StepSessionProvider>
        <Slot />
      </StepSessionProvider>
    </AuthSessionProvider>
  );
}