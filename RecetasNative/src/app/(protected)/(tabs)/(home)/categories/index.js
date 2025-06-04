import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import CategoryCardList from '../../../../../components/CategoryCardList';
import { useRouter } from 'expo-router';
import { ApiService } from '../../../../../services/ApiService';
import { useApiMessage } from '../../../../../hooks/useApiMessage';

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
                // Ajusta según la estructura de tu respuesta
                console.log('Categorías obtenidas:', res.data.categories);
                 
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
        console.log('Categoría seleccionada:', category._id);
        router.navigate(`/categories/${category._id}`);
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
            <View style={style.screenContainer}>
                <Text>No hay categorías disponibles</Text>
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
};