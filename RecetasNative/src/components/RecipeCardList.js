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
    // console.log("Rendering item:", item.id),
      // console.log("Rendering item:", item.isFavorite),
      
    <RecipeCard  
      avatar={item.user_id.profileImage}
      username={item.user_id.name + ' ' + item.user_id.lastName}
      rating={item.averageRating}
      recipeImage={item.images[0].url}
      recipeTitle={item.title}
      isFavorite={item.isFavorite}
      onFavoriteToggle={() => onFavoriteToggle(item._id)}
      onPressRecipe={() => onPressRecipe(item)}
      onPressAvatar={() => onPressAvatar(item.user_id._id)}
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