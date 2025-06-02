import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import RecipeItem from './RecipeItem'; // Asegúrate de que la ruta sea correcta

const RecipeItemList = ({ data, onPressRecipe }) => {
  const renderItem = ({ item }) => (
    console.log("Rendering item:", item),
    
    <RecipeItem
      imageUrl={item.imageUrl}
      title={item.title}
      time={item.time}
      difficulty={item.difficulty}
      servings={item.servings}
      rating={item.rating}
      onPressRecipe={() => onPressRecipe(item)} // Asegúrate de pasar la función correctamente
    />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

export default RecipeItemList;


