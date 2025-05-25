import { StyleSheet, View, Text, TextInput, ScrollView} from 'react-native';
import IngredientItem from '../../../components/IngredientItem';
import ImageSelector from '../../../components/common/ImagePicker';
import StepItem from '../../../components/StepItem';

export default function AddScreen() {

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center', gap: 20 }}>
        <IngredientItem/>
        <IngredientItem/>
        <IngredientItem/>
        <IngredientItem/>
        <IngredientItem/>
        <StepItem/>
        <StepItem/>
        <StepItem/>
        <StepItem/>
        <StepItem/>
      </ScrollView>
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