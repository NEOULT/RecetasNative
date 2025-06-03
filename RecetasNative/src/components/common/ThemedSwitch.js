// components/ThemeSwitch.js

import { Switch, View, Text } from 'react-native';
import ThemedText from './ThemedText';

export default function ThemeSwitch ({value, onValueChange, title = "Titulo", width = 100, scaleX = 1.4, scaleY = 1.3}) {
  return (
    <View style={[styles.container, {width}]}>
      <ThemedText>{title}</ThemedText>
      <Switch
        value={value}
        onValueChange={() => onValueChange(!value)}
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={value ? '#2a58a5' : '#f4f3f4'}
        style={{ transform: [{ scaleX }, { scaleY }] }}
      />
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

};