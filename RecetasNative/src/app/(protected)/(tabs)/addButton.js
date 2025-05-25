import { StyleSheet, View, Text, TextInput} from 'react-native';
import IngredientItem from '../../../components/IngredientItem';


export default function AddScreen() {

  return (
    <View style={styles.container}>
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