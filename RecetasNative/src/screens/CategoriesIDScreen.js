import React from 'react';
import { View, Text } from 'react-native';
import RecipeItemList from '../components/RecipeItemList';

export default function CategoriesIDScreen() {}

    const sampleData = [
        { imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg', title: 'Receta 1', time: '30 min', difficulty: 'Fácil', servings: 4, rating: 4.5 },
        { imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg', title: 'Receta 2', time: '45 min', difficulty: 'Intermedio', servings: 2, rating: 4.0 },
        { imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg', title: 'Receta 3', time: '1 hora', difficulty: 'Difícil', servings: 6, rating: 5.0 },
        { imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg', title: 'Receta 4', time: '20 min', difficulty: 'Fácil', servings: 4, rating: 3.5 },
        { imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg', title: 'Receta 5', time: '15 min', difficulty: 'Fácil', servings: 2, rating: 4.8 },
      ];

    const handlePressRecipe = (recipe) => {
        console.log('Categoría seleccionada:', recipe.title);
    }

    return (
        <View style={style.screenContainer}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 16 }}>Recetas</Text>
            <RecipeItemList data={sampleData} onPressRecipe={handlePressRecipe} />
        </View>
    );
      
}

const style = {
    screenContainer: {
        borderwidth: 1000,
        width: '100%',
        flex: 1,
    },
};



