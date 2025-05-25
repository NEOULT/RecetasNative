import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
const {Navigator} = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator)

export default function HomeLayout() {

  return (
  <MaterialTopTabs
    initialRouteName="recipes"
    screenOptions={{
      tabBarScrollEnabled: false,
      tabBarLabelStyle: { fontWeight: 'bold', fontSize: 20 },
      tabBarIndicatorStyle: { backgroundColor: 'orange' },
    }}>
      <MaterialTopTabs.Screen name="recipes" options={{ title: 'Recetas' }}/>
      <MaterialTopTabs.Screen name="categories" options={{ title: 'Categorias' }}/>
      <MaterialTopTabs.Screen name="groups" options={{ title: 'Grupos' }}/>
  </MaterialTopTabs>
  );
}
