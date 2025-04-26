import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Layout from '../components/common/Layout.js';
import { useTheme } from '../styles/theme/ThemeContext.js';
import { ThemeSwitch } from '../components/common/ThemedSwitch.js';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
      {/* Aquí puedes agregar más componentes o lógica según sea necesario */}
      <Tab.Navigator
        screenOptions={{
          headerShown: false, // Oculta el header
          tabBarStyle: {
            backgroundColor: colors.layout_backgroundcolor, // Personaliza el fondo del footer
            height: 60, // Ajusta la altura del footer
          },
          tabBarActiveTintColor: '#6200EE', // Color de íconos/texto activos
          tabBarInactiveTintColor: '#B0BEC5', // Color de íconos/texto inactivos
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={Layout} 
          options={{
            tabBarLabel: 'Inicio', // Etiqueta de la pestaña
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ThemeSwitch} 
          options={{
            tabBarLabel: 'Perfil', // Etiqueta de la pestaña
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}