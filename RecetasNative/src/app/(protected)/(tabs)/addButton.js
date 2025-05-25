import { StyleSheet, View, Text, TextInput} from 'react-native';
import IngredientItem from '../../../components/IngredientItem';
import ImageSelector from '../../../components/common/ImagePicker';


export default function AddScreen() {

  return (
    <View style={styles.container}>
        <ImageSelector width={200} height={100}/>
        <IngredientItem/>
        <IngredientItem/>
        <IngredientItem/>
        <IngredientItem/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  
});