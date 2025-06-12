import RecipeCardList from "../../../../components/RecipeCardList";
import InfoBox from "../../../../components/common/InfoBox";
import { useEffect, useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { ApiService } from "../../../../services/ApiService";
import { useApiMessage } from "../../../../hooks/useApiMessage";
import { router } from "expo-router";
import ThemedText from "../../../../components/common/ThemedText";
import { getUserId } from "../../../../hooks/useGetUserId";
import { ActivityIndicator } from "react-native-paper";
import { useFocusEffect } from '@react-navigation/native';
import { Pressable } from 'react-native';

const api = new ApiService();

export default function FavoritesScreen() {
  const [recipes, setRecipes] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, hasMore: true });
  const { info, callApiWithMessage, clearInfo, setInfo } = useApiMessage();
  const [loading, setLoading] = useState(true);

  const [showFavoriteRecipes, setShowFavoriteRecipes] = useState(true);
  const [showFavoriteGroups, setShowFavoriteGroups] = useState(false);

  const favoriteGroups = []

  const fetchFavorites = useCallback(async (pageToFetch = 1) => {
    try {
      const user_id = await getUserId();
      const response = await callApiWithMessage(() =>
        api.paginateFavorites(user_id, pageToFetch, 5)
      );

      clearInfo();
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
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, [callApiWithMessage]);

 useFocusEffect(
     useCallback(() => {
       fetchFavorites(1);
     }, [])
   );

  useEffect(() => {
    if (info.message) {
      const timeout = setTimeout(clearInfo, 3000);
      return () => clearTimeout(timeout);
    }
  }, [info.message, clearInfo]);

  const handleLoadMore = () => {
    if (pagination.hasMore && !info.loading) {
      fetchFavorites(pagination.page + 1);
    }
  };

  const toggleFavorite = async (id) => {
      try {
        const user_id = await getUserId();
        // Busca el estado actual de la receta
        const recipe = recipes.find(r => r._id === id);
        console.log(recipe);
        
        const wasFavorite = recipe?.isFavorite;
        console.log("Toggle favorite for recipe ID:", id, "User ID:", user_id, "Was favorite:", wasFavorite);
        
        await callApiWithMessage(() => api.toggleFavorite(id, user_id));
        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe._id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
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
    router.navigate(`/favorites/${recipe._id}`);
  };

  const handlePressAvatar = (avatar) => {
    // Puedes implementar navegación al perfil si lo deseas
  };

  if (loading) {
    return (
      <View style={[styles.screenContainer, styles.center]}>
        <ActivityIndicator size="large" color="#FF9100" />
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <InfoBox
        message={info.message}
        type={info.type}
        onHide={clearInfo}
        duration={2000}
      />

      {/* Recetas favoritas */}
      <Pressable 
      style={styles.pressableDropdown}
      onPress={() => setShowFavoriteRecipes((prev) => !prev)}>
        <ThemedText type="title" style={{marginTop: 10, marginBottom: 5}}>
          {showFavoriteRecipes ? "Ocultar recetas favoritas ▲" : "Mostrar recetas favoritas ▼"}
        </ThemedText>
      </Pressable>
      {showFavoriteRecipes && (
        recipes.length === 0 && !info.loading ? (
          <ThemedText type="title" textAlign='center'>
            No tienes recetas favoritas
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
        )
      )}

      {/* Grupos favoritos */}
      <Pressable 
      style={styles.pressableDropdown}
      onPress={() => setShowFavoriteGroups((prev) => !prev)}>
        <ThemedText type="title" style={{marginTop: 20, marginBottom: 5}}>
          {showFavoriteGroups ? "Ocultar grupos Seguidos ▲" : "Mostrar grupos Seguidos ▼"}
        </ThemedText>
      </Pressable>
      {showFavoriteGroups && (
        favoriteGroups.length === 0 ? (
          <ThemedText type="title" textAlign='center'>
            Aún no sigues ningún grupo
          </ThemedText>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {favoriteGroups.map(group => (
              <Image
                key={group._id}
                source={{ uri: group.image ?? 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' }}
                style={{ width: 200, height: 100, borderRadius: 10, marginRight: 10 }}
              />
            ))}
          </ScrollView>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    width: "100%",
    flex: 1,
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  pressableDropdown: {
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 0,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2, // sombra para Android
    shadowColor: '#000', // sombra para iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

});