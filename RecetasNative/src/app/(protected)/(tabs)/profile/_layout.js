import { Stack } from 'expo-router';
import { Pressable } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/authContext.jsx';
import { useTheme } from '../../../../styles/theme/ThemeContext.js'

export default function PerfilLayout() {

  const { colors } = useTheme();
  
  const { logOut } = useContext(AuthContext);
  const router = useRouter();
  const handleSettingsPress = () => {
      router.push('/profile/settings');
    }
  return (
    <Stack
      screenOptions={{
        title: 'Perfil',
        headerTitleAlign: 'right',
        // headerShown: false,
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: '#333',
      }}
    >
        <Stack.Screen name="index" options={{ 
          title: '',
          headerTitleAlign: 'center',
          headerRight: () => (
            <Pressable onPress={() => handleSettingsPress()} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
              <Feather name="settings" size={22} color="gray" />
            </Pressable>
          ),
          headerLeft: () => (
            <Pressable onPress={() => logOut()} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
              <MaterialIcons name="logout" size={22} color="gray" />
            </Pressable>
          ),
          }} /> 
        <Stack.Screen name="recipes/index" options={{ title: 'Mis Recetas' }} />
        <Stack.Screen name="groups/index" options={{ title: 'Mis Grupos' }} />
        <Stack.Screen name="settings" options={{ title: 'Configuración' }} />
        <Stack.Screen name="recipes/editRecipe" options={{ title: 'Editar Receta' }} />

    
    </Stack>
  )
}