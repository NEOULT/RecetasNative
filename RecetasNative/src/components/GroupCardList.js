import React from 'react';
import { FlatList } from 'react-native';
import GroupCard from './GroupCard'; // Ajusta la ruta según tu estructura

const GroupCardList = ({ groups, onPressGroup }) => {
  const renderItem = ({ item }) => (
    <GroupCard
      imageUrl={item.imageUrl}
      title={item.title}
      recipesCount={item.recipesCount}
      membersCount={item.membersCount}
      onPress={() => onPressGroup(item)}
    />
  );

  return (
    <FlatList
      data={groups}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

export default GroupCardList;
