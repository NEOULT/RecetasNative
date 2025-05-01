import React from 'react';
import { View, styles } from 'react-native';
import CategoryCardList from '../components/CategoryCardList';

export default function CategoriesScreen() {

    const sampleData = [
        { title: 'Montañas', imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' },
        { title: 'Lago', imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' },
        { title: 'Bosque', imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' },
        { title: 'Desierto', imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' },
        { title: 'Playa', imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' },
        { title: 'Ciudad', imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' },
        { title: 'Campo', imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' },
        { title: 'Cielo', imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' },
        { title: 'Nieve', imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' },
        { title: 'Río', imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' },
        { title: 'Cascada', imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' },
        { title: 'Selva', imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' },
      ];
      
    return (
        <View style={style.screenContainer}>
            <CategoryCardList data={sampleData} />
        </View>
    );
      
}

const style = {
    screenContainer: {
        width: '100%',
        flex: 1,
    },
};



