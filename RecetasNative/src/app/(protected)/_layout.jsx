
import { Stack,Redirect } from 'expo-router';


const isLoggedIn = true; 

export default function ProtectedLayout() {

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
