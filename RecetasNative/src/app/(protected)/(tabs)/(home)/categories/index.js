import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import CategoryCardList from '../../../../../components/CategoryCardList';
import { useRouter } from 'expo-router';
import { ApiService } from '../../../../../services/ApiService';
import { useApiMessage } from '../../../../../hooks/useApiMessage';
import ThemedText from '../../../../../components/common/ThemedText';

const api = new ApiService();

export default function CategoriesScreen() {
    const router = useRouter();
    const { info, callApiWithMessage, clearInfo } = useApiMessage();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await callApiWithMessage(() => api.getCategories());

                // console.log('Categorías obtenidas:', res.data.categories);
                 
                setCategories(res.data.categories || []);
            } catch (e) {
                setCategories([]);
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    }, []); 

    const handlePressCategory = (category) => {
        console.log('Categoría seleccionada:', category.name);
        router.navigate({
            pathname: `/categories/${category._id}`,
            params: { categoryId: category.id , categoryName: category.name }
        });
    };

    if (loading) {
        return (
            <View style={style.screenContainer}>
                <ActivityIndicator size="large" color="#FF9100" />
            </View>
        );
    }

    if (!categories.length) {
        return (
            <View style={[style.screenContainer, style.center]}>
                <ThemedText textAlign='center'>No hay categorias disponibles</ThemedText>
            </View>
        );
    }

    return (
        <View style={style.screenContainer}>
            <CategoryCardList data={categories} onPressCategory={handlePressCategory} />
        </View>
    );
}

const style = {
    screenContainer: {
        width: '100%',
        flex: 1,
    },
    center: {
        alignSelf: 'center',
        justifyContent: 'center',
    }
};