import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Modal, Pressable, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ThemedText from './ThemedText';
import { useTheme } from '../../styles/theme/ThemeContext';

export default function AddButton({ isVisible, onClose, children, title, showBackdrop = true , height}) {

  const {colors} = useTheme();
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  return (
    <>
      {isVisible && showBackdrop && (
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
          <Pressable style={{ flex: 1 }} onPress={onClose} />
        </Animated.View>
      )}

      <Modal
        visible={isVisible}
        animationType="slide"
        transparent
        onRequestClose={onClose}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={[styles.modalContent, { backgroundColor: colors.card, height: height }]}>
            <View style={[styles.row, { alignSelf: 'flex-start' }]}>
              <Pressable onPress={onClose}>
                <Feather name="x" size={28} color={colors.primary_iconcolor} />
              </Pressable>
              {title && <ThemedText>{title}</ThemedText>}
            </View>
            {children}
          </View>
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
  },
  modalContent: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 18,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    minHeight: 200,
    maxHeight: '98%',
    gap: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 10,
    gap: 50,
  },
});