import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import RecipeItem from './RecipeItem'; // Asegúrate de que la ruta sea correcta

const RecipeItemList = ({ 
  data,
  onPressRecipe,
  onEndReached,
  isFetchingMore, 
}) => {
  const renderItem = ({ item }) => (
    
    <RecipeItem
      imageUrl={item.images[0].url}
      title={item.title}
      time={item.preparation_time}
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
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
          isFetchingMore ? <ActivityIndicator size="small" color="#FF9100" /> : null
        }
      showsVerticalScrollIndicator={false}
    />
  );
};

export default RecipeItemList;


