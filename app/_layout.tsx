import { Slot } from 'expo-router';
import { SessionProvider as AuthSessionProvider } from '../auth/auth';
import { SessionProvider as StepSessionProvider } from '../components/StepContext';

export default function Root() {
  return (
    <AuthSessionProvider>
      <StepSessionProvider>
        <Slot />
      </StepSessionProvider>
    </AuthSessionProvider>
  );
}