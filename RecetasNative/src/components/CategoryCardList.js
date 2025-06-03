import React from 'react';
import { FlatList, View, StyleSheet, Dimensions } from 'react-native';
import CategoryCard from './CategoryCard';

const CategoryCardList = ({ data, onPressCategory }) => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <CategoryCard 
      title={item.name} 
      imageUrl={item.image}
      onPressCategory={() => onPressCategory(item)} // Asegúrate de pasar la función correctamente
      />
    </View>
  );

  return (
    <FlatList
      data={data} 
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()} 
      numColumns={2}
      contentContainerStyle={styles.list}
      
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
  },
});

export default CategoryCardList;
