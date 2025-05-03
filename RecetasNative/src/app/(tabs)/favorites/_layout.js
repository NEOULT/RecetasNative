import { Stack } from 'expo-router';

export default function FavoritesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        title: 'Favoritos',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#f8f8f8',
        },
        headerTintColor: '#333',
      }}
    >
        <Stack.Screen name="index" options={{ title: 'Favoritos' }} /> 
        <Stack.Screen name="[recipeId]" options={{ title: 'Recetas' }} />
    </Stack>
  )
}