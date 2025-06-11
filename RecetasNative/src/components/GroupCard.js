import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Pressable, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../styles/theme/ThemeContext.js';
import ThemedText from './common/ThemedText.js';
import { usePathname } from 'expo-router';
import { ApiService } from '../services/ApiService';
import { useApiMessage } from '../hooks/useApiMessage';

const api = new ApiService();
const GroupCard = ({ imageUrl, title, recipesCount, membersCount, onPress, onDelete, group, onEdit  }) => {

  const [showOptions, setShowOptions] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
  const { colors } = useTheme();
  const { info, callApiWithMessage, clearInfo } = useApiMessage();

  const pathname = usePathname();
  const showMoreButton = pathname === '/profile/groups'
  const moreBtnRef = useRef(null);

  const handleMorePress = (e) => {
    e.stopPropagation();
    if (moreBtnRef.current) {
      moreBtnRef.current.measureInWindow((x, y, width, height) => {
        const screenWidth = Dimensions.get('window').width;
        setMenuPos({
          top: y + height -130,
          right: screenWidth - (x + width),
        });
        setShowOptions(true);
      });
    } else {
      setShowOptions(true);
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image source={{ uri: imageUrl || 'https://via.placeholder.com/300x180.png?text=Sin+imagen' }} style={styles.image} />
        <View style={styles.infoContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtext}>
              {recipesCount} recetas • {membersCount} miembros
            </Text>
          </View>
          {!showMoreButton && <Feather name="chevron-right" size={24} color="gray" />}
        </View>
      </TouchableOpacity>
 
      {showMoreButton && (
        <>
        <TouchableOpacity
            ref={moreBtnRef}
            style={styles.moreButton}
            onPress={handleMorePress}
          >
            <Feather name="more-vertical" size={24} />
        </TouchableOpacity>
        <Modal
          visible={showOptions}
          transparent
          animationType="fade"
          onRequestClose={() => setShowOptions(false)}
        >
          <Pressable style={styles.modalOverlay} onPress={() => setShowOptions(false)}>
            <View style={[
              styles.menuContainer,
              { top: menuPos.top, right: menuPos.right },
              { backgroundColor: colors.card}
            ]}>
              <Pressable style={styles.menuItem} onPress={() => { 
                
                  setShowOptions(false);
                  if (onEdit) onEdit(group);

                
                }}>
                <Feather name="edit-2" size={17} color={colors.regular_textcolor} />
                <ThemedText>Editar</ThemedText>
              </Pressable>
              <Pressable style={styles.menuItem} onPress={ async () => { 
                  setShowOptions(false); 
                  try{
                    //Arreglar este endpoint
                    const response =  await callApiWithMessage(() => api.softDeleteGroup(group._id));
                        
                    console.log(response);
                    
                    if(response.success) onDelete();

                  }catch(e){
                    console.error('Error al eliminar el grupo:', e);
                  }

                  if (onDelete)  onDelete();
                }}>
                <Feather name="trash-2" size={18} color={colors.regular_textcolor} />
                <ThemedText>Eliminar</ThemedText>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 180,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    position: 'relative',
  },
  moreButton: {
    position: 'absolute',
    bottom: 29,
    right: 10,
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
    alignItems: 'center',
    gap: 10,
  },
  menuText: {
    fontSize: 15,
    color: '#333',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  subtext: {
    color: '#555',
    fontSize: 13,
  },
});

export default GroupCard;