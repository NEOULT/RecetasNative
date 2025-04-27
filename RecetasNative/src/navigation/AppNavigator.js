import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Layout from '../components/common/Layout.js';
import { useTheme } from '../styles/theme/ThemeContext.js';
import { ThemeSwitch } from '../components/common/ThemedSwitch.js';
import CustomTabBar from '../components/common/CustomTabBar.js'; // Importa el footer personalizado

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={{
        headerShown: false, // Oculta el header

      }}
      tabBar={(props) => <CustomTabBar {...props} />} // Usa el footer personalizado
    >
        <Tab.Screen 
          name="Home" 
          component={Layout} 
          options={{
            tabBarLabel: 'Inicio', // Etiqueta de la pestaña
          }}
        />
        <Tab.Screen 
          name="Add" 
          component={ThemeSwitch} 
          options={{
            tabBarLabel: 'Perfil', // Etiqueta de la pestaña
          }}
        />
        <Tab.Screen 
          name="Favorites" 
          component={Layout} 
          options={{
            tabBarLabel: 'Favoritos', // Etiqueta de la pestaña
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}