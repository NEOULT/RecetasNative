import { StyleSheet, Text, View } from 'react-native';
import RecipeDetail from '../../recipes/[recipeId]';

export default function CategoryRecipeScreen() {

  return (
    <RecipeDetail/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});