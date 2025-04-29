// components/ThemeSwitch.js
import { useTheme } from '../../styles/theme/ThemeContext';
import { Switch, View, Text } from 'react-native';

export const ThemeSwitch = () => {
  const { isDark, setScheme, colors } = useTheme();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 100 }}>
      <Text style={{ color: colors.primary_color }}>Modo oscuro</Text>
      <Switch
        value={isDark}
        onValueChange={() => setScheme(isDark ? 'light' : 'dark')}
      />
    </View>
  );
};