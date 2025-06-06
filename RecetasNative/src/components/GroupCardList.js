import React from 'react';
import { FlatList, View, ActivityIndicator } from 'react-native';
import GroupCard from './GroupCard';

const GroupCardList = ({
  groups,
  onPressGroup,
  onEndReached,
  isFetchingMore,
  onDeleteGroup,
  onEditGroup,

}) => {
  const renderItem = ({ item }) => (
    <GroupCard
      imageUrl={item.image}
      title={item.name}
      recipesCount={item.recipes?.length || 0}
      membersCount={item.groupMembers?.length || 0}
      onPress={() => onPressGroup(item)}
      onDelete={onDeleteGroup}
      group={item}
      onEdit={onEditGroup}
    />
  );

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <FlatList
        data={groups}
        renderItem={renderItem}
        keyExtractor={(item, index) => item._id?.toString() || index.toString()}
        contentContainerStyle={{ padding: 16 }}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingMore ? <ActivityIndicator size="small" color="#FF9100" /> : null
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default GroupCardList;