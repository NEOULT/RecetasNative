import RecipeCardList from "../../../../../components/RecipeCardList";
import InfoBox from "../../../../../components/common/InfoBox";
import { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ApiService } from "../../../../../services/ApiService";
import { useApiMessage } from "../../../../../hooks/useApiMessage";

const api = new ApiService();

export default function RecipesScreen() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { info, callApiWithMessage, clearInfo } = useApiMessage();

    const fetchRecipes = useCallback(async (pageToFetch = 1) => {
      try {
        if (pageToFetch === 1) setLoading(true);
        else setIsFetchingMore(true);

        // Usa callApiWithMessage para que info se setee automáticamente
        const response = await callApiWithMessage(() => api.paginateRecipesPublic(pageToFetch, 5));
        const newRecipes = response.data.data; 
        const totalPages = response.data.totalPages;
  
        setRecipes(prev =>
          pageToFetch === 1 ? newRecipes : [...prev, ...newRecipes]
        );
        setHasMore(pageToFetch < totalPages); 
      } catch (error) { 
        // El mensaje de error ya se setea en info por callApiWithMessage
        console.error("Error fetching recipes:", error);
      } finally { 
        setLoading(false); 
        setIsFetchingMore(false); 
      }
    }, [api, callApiWithMessage]);

  useEffect(() => {
    setPage(1); 
    fetchRecipes(1); 
  }, []);

  useEffect(() => {
    if (info.message) {
      const timeout = setTimeout(() => {
        clearInfo();
      }, 3000); 
      return () => clearTimeout(timeout);
    }
  }, [info.message, clearInfo]);

  const handleLoadMore = () => {
    if (hasMore && !isFetchingMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchRecipes(nextPage);
    }
  };

  if (loading && page === 1) {
    return (
      <View style={styles.screenContainer}>
        <Text>Cargando recetas...</Text>
      </View>
    ); 
  } 

  return (
    <View style={styles.screenContainer}>
      {/* duration debe siempre ser inferior al valor del setTimOut de Clear Info para evitar Warnings*/} 
      <InfoBox message={info.message} type={info.type} onHide={clearInfo} duration={2000} />
      <RecipeCardList
        data={recipes}
        onFavoriteToggle={() => {}}
        onPressAvatar={() => {}}
        onPressRecipe={() => {}}
        onEndReached={handleLoadMore} 
        isFetchingMore={isFetchingMore}
      />
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