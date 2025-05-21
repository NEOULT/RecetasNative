
import { Stack,Redirect } from 'expo-router';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext.jsx';

export default function ProtectedLayout() {

  const { isLoggedIn, token } = useContext(AuthContext);

  if (!isLoggedIn){
    return null;
  }
  if (!token) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
