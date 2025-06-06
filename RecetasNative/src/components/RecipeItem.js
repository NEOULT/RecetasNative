import React, { useState, useRef } from 'react';
import { View, Text, Image, Animated, StyleSheet, TouchableOpacity, Modal, Pressable, Dimensions } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { convertIsoToTime } from '../hooks/useTimeIso.js';
import { usePathname } from 'expo-router';
import { useTheme } from '../styles/theme/ThemeContext.js';
import ThemedText from './common/ThemedText.js';
import { useAddToGroup } from '../context/AddToGroupContext';



const RecipeItem = ({ imageUrl, title, time, difficulty, servings, rating, onPressRecipe, recipeId }) => {


  const [pressed, setPressed] = useState(false);
  const animatedValue = useRef(new Animated.Value(1)).current;
  const [ShowOptions, setShowOptions] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
  const moreBtnRef = useRef(null);

  const { colors } = useTheme();
  const pathname = usePathname();
  const showMoreButton = pathname === '/profile/recipes';

  
  const { openModal } = useAddToGroup();


  const handleMorePress = (e) => {
    e.stopPropagation();
    if (moreBtnRef.current) {
      moreBtnRef.current.measureInWindow((x, y, width, height) => {
     
        const screenWidth = Dimensions.get('window').width;
        setMenuPos({
          top: y - 125, 
          right: screenWidth - (x + width),
        });
        setShowOptions(true);
      });
    } else {
      setShowOptions(true);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPressRecipe}
    >
      <Animated.View
        style={[
          styles.container,
          {
            opacity: pressed ? 0.8 : 1,
            transform: [{ scale: animatedValue }],
            shadowOpacity: pressed ? 0.35 : 0.15,
            elevation: pressed ? 6 : 2,
          }
        ]}
      >
        <Image source={{ uri: imageUrl }} style={styles.image} />

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.details}>
            <View style={styles.row}>
              <View style={styles.subrow}>
                <Feather name="clock" size={14} color="#666" />
                <Text style={styles.text}>{convertIsoToTime(time).time + ' ' + convertIsoToTime(time).unit}</Text>
              </View>
              <View style={styles.subrow}>
                <MaterialIcons name="whatshot" size={14} color="#666" style={styles.iconSpacing} />
                <Text style={styles.text}>{difficulty}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.subrow}>
                <Feather name="user" size={14} color="#666" />
                <Text style={styles.text}>{servings}</Text>
              </View>
              
            </View>
          </View>
        </View>

        {showMoreButton && (
          <>
            <TouchableOpacity
              ref={moreBtnRef}
              style={styles.moreButton}
              onPress={handleMorePress}
            >
              <Feather name="more-vertical" size={25} />
            </TouchableOpacity>
            <Modal
              visible={ShowOptions}
              transparent
              animationType="fade"
              onRequestClose={() => setShowOptions(false)}
            >
              <Pressable style={styles.modalOverlay} onPress={() => setShowOptions(false)}>
                <View style={[
                  styles.menuContainer,
                  { top: menuPos.top, right: menuPos.right }, { backgroundColor: colors.card}
                ]}>
                  <Pressable style={styles.menuItem} onPress={() => {
                        setShowOptions(false); 
                        if (recipeId) openModal(recipeId); }}>
                    <Feather name="plus" size={21} color={colors.regular_textcolor} />
                    <ThemedText>Añadir</ThemedText>
                  </Pressable>
                  <Pressable style={styles.menuItem} onPress={() => { setShowOptions(false);  }}>
                    <Feather name="edit-2" size={17} color={colors.regular_textcolor} />
                    <ThemedText>Editar</ThemedText>
                  </Pressable>
                  <Pressable style={styles.menuItem} onPress={() => { setShowOptions(false);  }}>
                    <Feather name="trash-2" size={18} color={colors.regular_textcolor} />
                    <ThemedText>Eliminar</ThemedText>
                  </Pressable>

                </View>
              </Pressable>
            </Modal>
          </>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  image: {
    width: 90,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
    boxShadow: '0 2px 3px rgba(0, 0, 0, 1)',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    gap: 5

  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    flex: 2,
    width: '85%'

  },
  row: {
    flexDirection: 'row',
    gap: 20,
  },
  text: {
    marginLeft: 4,
    fontSize: 13,
    color: '#333',
  },
  iconSpacing: {
    marginLeft: 12,
  },
  starContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  details:{
    flexDirection: 'column',
    gap: 6,

  },
  subrow:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    width: '33%',
  },
  moreButton: {
    position: 'absolute',
    top: 8,
    right: 3,
    zIndex: 2,
    padding: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  menuContainer: {
    position: 'absolute',
    backgroundColor: '#f7f7f7',
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 8,
    minWidth: 120,
  },
  menuItem: {
    paddingVertical: 8,
    flexDirection: 'row',
    gap: 10,
  },
});

export default RecipeItem;
