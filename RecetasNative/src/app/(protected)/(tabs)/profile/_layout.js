import { Stack } from 'expo-router';

export default function PerfilLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        title: 'Perfil',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#f8f8f8',
        },
        headerTintColor: '#333',
      }}
    >
        <Stack.Screen name="index" options={{ title: 'Perfil' }} /> 
    </Stack>
  )
}