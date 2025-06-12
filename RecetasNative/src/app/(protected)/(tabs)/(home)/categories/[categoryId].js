import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import RecipeItemList from '../../../../../components/RecipeItemList';
import { useLocalSearchParams } from 'expo-router';
import { ApiService } from '../../../../../services/ApiService';
import { useApiMessage } from '../../../../../hooks/useApiMessage';
import ThemedText from '../../../../../components/common/ThemedText';
import { useRouter } from 'expo-router';
import InfoBox from '../../../../../components/common/InfoBox';

const api = new ApiService();

export default function CategoriesIDScreen() {
    const router = useRouter();
    const { categoryId, categoryName } = useLocalSearchParams();
    const { info, callApiWithMessage, clearInfo } = useApiMessage();
    const [recipes, setRecipes] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, hasMore: true });
    const [loading, setLoading] = useState(true); // <-- loading state

    const fetchRecipes = useCallback(async (pageToFetch = 1) => {
        try {
            if (pageToFetch === 1) setLoading(true); // <-- set loading true solo en la primera página
            const res = await callApiWithMessage(() =>
                api.paginateRecipesByCategory(pageToFetch, 5, categoryId)
            );
            clearInfo();
            setRecipes(prev =>
                pageToFetch === 1
                    ? res.data.data
                    : [...prev, ...res.data.data]
            );
            setPagination({
                page: pageToFetch,
                hasMore: pageToFetch < res.data.totalPages
            });
        } catch (e) {
            console.error("Error fetching recipes:", e);
        } finally {
            setLoading(false); // <-- set loading false al terminar
        }
    }, [categoryId]);

    useEffect(() => {
        fetchRecipes(1);
    }, [fetchRecipes]);

    useEffect(() => {
        if (info.message) {
            const timeout = setTimeout(clearInfo, 3000);
            return () => clearTimeout(timeout);
        }
    }, [info.message, clearInfo]);

    const handleLoadMore = () => {
        if (pagination.hasMore && !info.loading) {
            fetchRecipes(pagination.page + 1);
        }
    };

    const handlePressRecipe = (recipe) => {
        router.navigate(`/categories/${categoryId}/${recipe.id}`);
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
            <InfoBox
                message={info.message}
                type={info.type}
                onHide={clearInfo}
                duration={2000}
            />
            <ThemedText style={{ marginLeft: 20, marginTop: 20 }} type="title">{`${categoryName}`}</ThemedText>
            <RecipeItemList
                data={recipes}
                onPressRecipe={handlePressRecipe}
                onEndReached={handleLoadMore}
                isFetchingMore={info.loading && pagination.page > 1}
            />
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
        flex: 1,
    }
};