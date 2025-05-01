import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../styles/theme/ThemeContext.js';
import { ThemeSwitch } from '../components/common/ThemedSwitch.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Layout from '../components/common/Layout.js';
import CustomTabBar from '../components/common/CustomTabBar.js'; // Importa el footer personalizado
import HomeScreen from '../screens/Home/HomeScreen.js'; // Importa la pantalla de inicio
import RecipesScreen from '../screens/RecipesScreen.js';
import { StatusBar } from 'expo-status-bar';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator(); // Crea el stack de navegación para la pantalla de inicio

function HomeStackScreen() {
  return (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    <HomeStack.Screen name="DetailsScreen" component={RecipesScreen} />
  </HomeStack.Navigator>
  );
}

export default function AppNavigator() {
  const { colors, isDark, fonts } = useTheme();

  function createSafeTheme(colors, isDark) {
    return {
      dark: isDark,
      colors: {
        primary: colors?.primary ?? '#6200ee',
        background: colors?.layout_backgroundcolor ?? '#ffffff',
        card: colors?.card ?? '#ffffff',
        text: colors?.regular_textcolor ?? '#000000',
        border: colors?.border ?? '#c7c7c7',
        notification: colors?.notification ?? '#ff80ab',
        regular: colors?.regular_textcolor ?? '#000000',
      },
      fonts: {
        regular: fonts.regular,
        medium: fonts.medium,
        light: fonts.light,
        thin: fonts.thin,
        bold: fonts.bold,
      },
    };
  }
  
  const MyTheme = createSafeTheme(colors, isDark); // Crea el tema seguro

  return (
    <NavigationContainer theme={MyTheme}> 
    <StatusBar style={isDark ? 'light' : 'dark'} backgroundColor={colors.layout_backgroundcolor} />
      <Tab.Navigator
      screenOptions={{
        headerShown: false, // Oculta el header

      }}
      tabBar={(props) => <CustomTabBar {...props} />} // Usa el footer personalizado
      >
        <Tab.Screen 
          name="Home" 
          component={HomeStackScreen} 
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
