import { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ThemedText from '../components/common/ThemedText';
import { useTheme } from '../styles/theme/ThemeContext';

export default function PlusPicker({
  label = '',
  options = [],
  onSelect,
  width = '100%',
  buttonHeight = 36,
}) {
  const [visible, setVisible] = useState(false);
    const { colors } = useTheme();

  const handleSelect = (option) => {
    setVisible(false);
    if (onSelect) onSelect(option);
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', width }}>
      {label ? <ThemedText>{label}</ThemedText> : null}
      <TouchableOpacity
        style={[styles.plusButton, { height: buttonHeight, backgroundColor: colors.primary_color }]}
        onPress={() => setVisible(true)}
      >
        <Icon name="add" size={25} color="#fff" />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.modalBox}>
            <ScrollView showsVerticalScrollIndicator={true} style={styles.scrollArea}>
              {options.map((opt, idx) => (
                <TouchableOpacity key={idx} style={styles.option} onPress={() => handleSelect(opt)}>
                  <Text style={styles.optionText}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  plusButton: {
    borderRadius: 50,
    width: 35,
    alignItems: 'center',
    marginLeft: 5,
    justifyContent: 'center',
    transform: [{ scale: 0.7 }],
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
  },
  modalBox: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    maxHeight: 300,
  },
  scrollArea: {
    maxHeight: 200,
  },
  option: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#34495e',
  },
});