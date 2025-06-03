import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import RecipeItemList from '../../../../../components/RecipeItemList';
import { useLocalSearchParams } from 'expo-router';
import { ApiService } from '../../../../../services/ApiService';
import { useApiMessage } from '../../../../../hooks/useApiMessage';

const api = new ApiService();

export default function CategoriesIDScreen() {
    const { categoryId } = useLocalSearchParams();
    const { info, callApiWithMessage, clearInfo } = useApiMessage();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRecipes() {
            try {
                const res = await callApiWithMessage(() => api.paginateRecipesByCategory(1,5, categoryId));
                 
                setRecipes(res.data.data || []); 
            } catch (e) {
                setRecipes([]);
            } finally {
                setLoading(false);
            }
        }
        fetchRecipes();
    }, [categoryId]);

    const handlePressRecipe = (recipe) => {
        console.log('Receta seleccionada:', recipe.title);
        // Aquí puedes navegar al detalle si lo deseas
    };

    if (loading) {
        return (
            <View style={style.screenContainer}>
                <ActivityIndicator size="large" color="#FF9100" />
            </View>
        );
    }

    if (!recipes.length) {
        return (
            <View style={style.screenContainer}>
                <Text>No hay recetas en esta categoría</Text>
            </View>
        );
    }

    return (
        <View style={style.screenContainer}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 16 }}>{`Categoría: ${categoryId}`}</Text>
            <RecipeItemList data={recipes} onPressRecipe={handlePressRecipe} />
        </View>
    );
}

const style = {
    screenContainer: {
        width: '100%',
        flex: 1,
    },
};