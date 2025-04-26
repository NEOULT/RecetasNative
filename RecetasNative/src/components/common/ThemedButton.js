// components/common/ThemedButton.js
import { useTheme } from '../../styles/theme/ThemeContext';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const ThemedButton = ({ title, onPress }) => {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: colors.regular_textcolor }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: colors.text }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ThemedButton;