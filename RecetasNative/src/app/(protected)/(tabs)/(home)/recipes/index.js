import RecipeCardList from "../../../../../components/RecipeCardList";
import { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ApiService } from "../../../../../services/ApiService";

const api = new ApiService();

export default function RecipesScreen() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchRecipes = useCallback(async (pageToFetch = 1) => {
    try {
      if (pageToFetch === 1) setLoading(true);
      else setIsFetchingMore(true);

      const response = await api.paginateRecipesPublic(pageToFetch, 5);
      const newRecipes = response.data.data;
      const totalPages = response.data.totalPages;
      console.log("Fetched recipes:", newRecipes);
      console.log("Total pages:", totalPages);
      
      setRecipes(prev =>
        pageToFetch === 1 ? newRecipes : [...prev, ...newRecipes]
      );
      setHasMore(pageToFetch < totalPages);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  }, [api]);  

  useEffect(() => {
    setPage(1);
    fetchRecipes(1);
  }, [fetchRecipes]); 

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