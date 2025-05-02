import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { ThemeProvider, useTheme } from './src/styles/theme/ThemeContext';  
import { ThemeSwitch } from './src/components/common/ThemedSwitch';
import ThemedButton from './src/components/common/ThemedButton';
import AppNavigator from './src/navigation/AppNavigator';

// Componente separado para usar el hook dentro del ThemeProvider
const AppContent = () => {
  const { colors } = useTheme(); // Ahora el hook se usa dentro del contexto

  return (
    <View style={[styles.container, { backgroundColor: colors.layout_backgroundcolor }]}>
      <Text style={{ color: 'red' }}>Open up App.js to start working on your app!</Text>
      <ThemeSwitch />
      <ThemedButton title={'Botonazo'} />
    </View>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});