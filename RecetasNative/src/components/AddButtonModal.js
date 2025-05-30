import { useState } from 'react';
import { View, StyleSheet, Pressable} from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import ThemedText from './common/ThemedText.js';
import { useRouter } from 'expo-router';
import SlideModal from './common/SlideModal.js'; 
import CreateGroupModal from './CreateGroupModal.js';


export default function AddButton({ isVisible, onClose }) {

  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();

  const handleGroupPress = () => {
    setModalVisible(true);
    onClose();

  };

  const handleRecipePress = () => {
    router.navigate('/createRecipe');
    onClose(); 
  }

  return (
    <>
      <SlideModal isVisible={isVisible} onClose={onClose} title="Comienza a crear ahora">
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={styles.modalContent}>

            <View style={styles.row}>

              <View style={styles.column}>
                <Pressable style={styles.box} onPress={handleRecipePress}>
                  <MaterialCommunityIcons name="chef-hat" size={40} color="white" />
                </Pressable>
                <ThemedText>Receta</ThemedText>
              </View>
              
              <View style={styles.column}>
                  <Pressable style={styles.box} onPress={handleGroupPress}>
                    <FontAwesome6 name="kitchen-set" size={40} color="white" />
                  </Pressable>
                  <ThemedText>Grupo</ThemedText>
              </View>

            </View>
            
          </View>
        </View>
      </SlideModal>

      {modalVisible && (
        <CreateGroupModal 
          isVisible={modalVisible} 
          onClose={() => setModalVisible(false)} 
        />
      )

      }
    </>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 18,
    gap: 33
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 48,
  },
  box:{
    backgroundColor: '#FF9100',
    width: 80,
    height: 80,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  },
});