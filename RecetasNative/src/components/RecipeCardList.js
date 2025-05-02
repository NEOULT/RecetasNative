import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RecipeCard from './RecipeCard';

const RecipeCardList = ({ data, onFavoriteToggle, onPressRecipe, onPressAvatar }) => {
  const renderItem = ({ item }) => (

    <RecipeCard
      avatar={item.avatar}
      username={item.username}
      rating={item.rating}
      recipeImage={item.recipeImage}
      recipeTitle={item.recipeTitle}
      isFavorite={item.isFavorite}
      onFavoriteToggle={() => onFavoriteToggle(item.id)}
      onPressRecipe={() => onPressRecipe(item)}
      onPressAvatar={() => onPressAvatar(item)}
      
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={10}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent} // Centra las tarjetas
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%', // Asegura que el contenedor ocupe todo el ancho
  },
  flatListContent: {
    paddingVertical: 10, // Espaciado vertical opcional
  },
});

export default RecipeCardList;