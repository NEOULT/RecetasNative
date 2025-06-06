import { StyleSheet, Text, View } from 'react-native';
import RecipeDetail from '../(home)/recipes/[recipeId]';

export default function FavoriteRecetaScreen() {
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
