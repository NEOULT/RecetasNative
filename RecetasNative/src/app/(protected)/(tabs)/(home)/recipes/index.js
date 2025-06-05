import RecipeCardList from "../../../../../components/RecipeCardList";
import InfoBox from "../../../../../components/common/InfoBox";
import { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ApiService } from "../../../../../services/ApiService";
import { useApiMessage } from "../../../../../hooks/useApiMessage";
import { router } from "expo-router";
import ThemedText from "../../../../../components/common/ThemedText";
import { getUserId } from "../../../../../hooks/useGetUserId";

const api = new ApiService();

export default function RecipesScreen() {
  const [recipes, setRecipes] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, hasMore: true });
  const { info, callApiWithMessage, clearInfo, setInfo } = useApiMessage();

  const fetchRecipes = useCallback(async (pageToFetch = 1) => {
    try {
      const viewer_id = await getUserId();
      console.log("Fetching recipes for viewer_id:", viewer_id);
      
      const response = await callApiWithMessage(() =>  
        api.paginateRecipesPublic(pageToFetch, 5, viewer_id)  
      );
      
      setRecipes(prev => 
        pageToFetch === 1 
          ? response.data.data 
          : [...prev, ...response.data.data]
      );
      
      setPagination({
        page: pageToFetch,
        hasMore: pageToFetch < response.data.totalPages
      });
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }, [callApiWithMessage]);

  useEffect(() => {
    fetchRecipes(1);
  }, []);

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

  const toggleFavorite = async (id) => {
    try {
      const user_id = await getUserId();
      // Busca el estado actual de la receta
      const recipe = recipes.find(r => r.id === id);
      const wasFavorite = recipe?.isFavorite;

      await callApiWithMessage(() => api.toggleFavorite(id, user_id));
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
        )
      );
      setInfo({
        message: wasFavorite
          ? "Receta eliminada de favoritos"
          : "¡Receta agregada a favoritos!",
        type: "success"
      });
    } catch (error) {
      console.error("Error al cambiar favorito:", error);
      setInfo({
        message: "No se pudo actualizar favorito",
        type: "error"
      });
    }
  };

  const handlePressRecipe = (recipe) => {
    console.log('Recipe selected:', recipe.recipeTitle);
    router.navigate(`/recipes/${recipe.id}`); 
  }

  const handlePressAvatar = (avatar) => {
    console.log('Avatar selected:', avatar.username);
  }

  return (
    <View style={styles.screenContainer}>
      <InfoBox 
        message={info.message} 
        type={info.type} 
        onHide={clearInfo} 
        duration={2000} 
      />
      
      {recipes.length === 0 && !info.loading ? (
        <ThemedText type="title" textAlign='center'>
          No hay recetas disponibles
        </ThemedText>
      ) : ( 
        <RecipeCardList
          data={recipes}
          onEndReached={handleLoadMore}
          isFetchingMore={info.loading && pagination.page > 1}
          onFavoriteToggle={toggleFavorite}
          onPressAvatar={handlePressAvatar}
          onPressRecipe={handlePressRecipe}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});