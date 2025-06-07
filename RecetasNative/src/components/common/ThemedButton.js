// components/common/ThemedButton.js
import { useTheme } from '../../styles/theme/ThemeContext';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const ThemedButton = ({ title, onPress, style , disabled}) => {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        style,
        {
          borderWidth: 1,
          borderColor: disabled ? 'gray' : colors.primary_color,
          borderRadius: 8,
          backgroundColor: disabled ? '#ccc' : colors.background, 
          opacity: disabled ? 0.5 : 1, 
        }
        
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: disabled ?  'gray' : colors.primary_color  }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ThemedButton;