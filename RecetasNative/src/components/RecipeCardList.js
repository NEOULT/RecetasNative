import React from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import RecipeCard from './RecipeCard';

const RecipeCardList = ({
  data,
  onFavoriteToggle,
  onPressRecipe,
  onPressAvatar,
  onEndReached,
  isFetchingMore,
}) => {
  const renderItem = ({ item }) => (
    <RecipeCard  
      avatar={item.avatar}
      username={item.username}
      rating={item.averageRating}
      recipeImage={item.url}
      recipeTitle={item.title}
      isFavorite={item.isFavorite}
      onFavoriteToggle={() => onFavoriteToggle(item._id)}
      onPressRecipe={() => onPressRecipe(item)}
      onPressAvatar={() => onPressAvatar(item)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingMore ? <ActivityIndicator size="small" color="#FF9100" /> : null
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  flatListContent: {
    paddingVertical: 10, 
  },
});

export default RecipeCardList; 