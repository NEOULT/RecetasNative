import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

const recipeDetails = {
  1: { name: 'Tacos', description: 'Deliciosos tacos con salsa.' },
  2: { name: 'Pizza', description: 'Pizza casera con queso y tomate.' },
  3: { name: 'Ensalada', description: 'Ensalada fresca con aguacate.' },
};

export default function RecipeDetail() {
  
  const { recipeId } = useLocalSearchParams();
  
  const recipe = recipeDetails[recipeId];
  
  if (!recipe) {
    return <Text>Receta no encontrada</Text>;
  }

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{recipe.name}</Text>
      <Text>{recipe.description}</Text>
    </View>
  );
}