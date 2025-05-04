import React from 'react';
import { View } from 'react-native';
import GroupCardList from '../../../../../components/GroupCardList'; // Ajusta la ruta según tu estructura

const groups = [
  {
    imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg',
    title: 'Recetas Mexicanas',
    recipesCount: 10,
    membersCount: 8,
  },
  {
    imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg',
    title: 'Cocina Vegana',
    recipesCount: 7,
    membersCount: 12,
  },
  {
    imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg',
    title: 'Postres Caseros',
    recipesCount: 15,
    membersCount: 20,
  },
];

export default function GroupScreen() {
  const handleGroupPress = (group) => {
    console.log('Grupo seleccionado:', group.title);
  };

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <GroupCardList groups={groups} onPressGroup={handleGroupPress} />
    </View>
  );
}
