import RecipeCardList from "../../../../../components/RecipeCardList";
import React from "react";
import { View, StyleSheet } from "react-native";

export default function RecipesScreen() {
  const [recipes, setRecipes] = React.useState([
    {
      id: 1,
      avatar: 'https://i.postimg.cc/J7KRWYkV/chad.jpg',
      username: 'Chef John',
      rating: 4.5,
      recipeImage: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg',
      recipeTitle: 'Spaghetti Carbonara',
      isFavorite: true,
    },
    {
      id: 2,
      avatar: 'https://i.postimg.cc/J7KRWYkV/chad.jpg',
      username: 'Chef Jane',
      rating: 4.8,
      recipeImage: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg',
      recipeTitle: 'Chicken Curry',
      isFavorite: false,
    },
    {
      id: 3,
      avatar: 'https://i.postimg.cc/J7KRWYkV/chad.jpg',
      username: 'Chef Mike',
      rating: 4.2,
      recipeImage: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg',
      recipeTitle: 'Vegetable Stir Fry',
      isFavorite: false,
    },
    {
      id: 4,
      avatar: 'https://i.postimg.cc/J7KRWYkV/chad.jpg',
      username: 'Chef Anna',
      rating: 4.7,
      recipeImage: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg',
      recipeTitle: 'Beef Tacos',
      isFavorite: false,
    },
    // Add more recipes as needed
  ]);

  const toggleFavorite = (id) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
      )
    );
  };

  const handlePressRecipe = (recipe) => {
    console.log('Recipe selected:', recipe.recipeTitle);
  }

  const handlePressAvatar = (avatar) => {
    console.log('Avatar selected:', avatar.username);
  }

  return (
    <View style={styles.screenContainer}>
      <RecipeCardList
        data={recipes}
        onFavoriteToggle={toggleFavorite}
        onPressAvatar={handlePressAvatar}
        onPressRecipe={handlePressRecipe}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
});