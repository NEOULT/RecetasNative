import React from 'react';
import { View, styles } from 'react-native';
import CategoryCardList from '../../../../../components/CategoryCardList';
import { useRouter } from 'expo-router';

export default function CategoriesScreen() {

    const router = useRouter();

    const sampleData = [
      { id: 1, title: 'Montañas', imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' },
      { id: 2, title: 'Lago', imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' },
      { id: 3, title: 'Bosque', imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' },
      { id: 4, title: 'Desierto', imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' },
      { id: 5, title: 'Playa', imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' },
      { id: 6, title: 'Ciudad', imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' },
      { id: 7, title: 'Campo', imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' },
      { id: 8, title: 'Cielo', imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' },
      { id: 9, title: 'Nieve', imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' },
      { id: 10, title: 'Río', imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' },
      { id: 11, title: 'Cascada', imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' },
      { id: 12, title: 'Selva', imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' },
    ];

    const handlePressCategory = (category) => {
        console.log('Categoría seleccionada:', category.title);
        router.navigate(`/categories/${category.id}`); 
    }

    return (
        <View style={style.screenContainer}>
            <CategoryCardList data={sampleData} onPressCategory={handlePressCategory} />
        </View>
    );
      
}

const style = {
    screenContainer: {
        width: '100%',
        flex: 1,
    },
};



