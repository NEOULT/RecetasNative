import React, { useState } from 'react';
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

export default function SelectPicker() {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const options = [
    'Opción 1', 'Opción 2', 'Opción 3',
    'Opción 4', 'Opción 5', 'Opción 6',
    'Opción 7', 'Opción 8', 'Opción 9',
  ];

  const handleSelect = (option) => {
    setSelected(option);
    setVisible(false);
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.input} onPress={() => setVisible(true)}>
        <Text style={[styles.inputText, { color: selected ? 'black' : '#999' }]}>
          {selected || 'Selecciona una opción'}
        </Text>
        <Icon name="arrow-drop-down" size={24} color="#555" />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.modalBox}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollArea}>
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
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#B3B3B3",
    height: 33,
    backgroundColor: "white",
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    fontSize: 16,
    paddingVertical: 3,
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

