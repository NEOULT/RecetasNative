import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import RecipeItemList from '../../../../../components/RecipeItemList';
import { useLocalSearchParams } from 'expo-router';
import { ApiService } from '../../../../../services/ApiService';
import { useApiMessage } from '../../../../../hooks/useApiMessage';
import ThemedText from '../../../../../components/common/ThemedText';
import { router } from 'expo-router';

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
        router.navigate(`/recipes/${recipe._id}`);
        // Aquí puedes navegar al detalle si lo deseas
    };

    if (loading) {
        return (
            <View style={[style.screenContainer, style.center]}>
                <ActivityIndicator size="large" color="#FF9100" />
            </View>
        );
    }

    if (!recipes.length) {
        return (
            <View style={[style.screenContainer, style.center]}>
                <ThemedText textAlign='center'>No hay recetas disponibles en esta categoría</ThemedText>
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
    center: {
        alignSelf: 'center',
        justifyContent: 'center',
    }
};