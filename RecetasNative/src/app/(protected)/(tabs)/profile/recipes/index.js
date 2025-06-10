import { Pressable, StyleSheet, Text, View, Animated, ActivityIndicator } from 'react-native';
import { useState, useRef, useEffect, useCallback } from 'react';
import RecipeItemList from '../../../../../components/RecipeItemList';
import { ApiService } from '../../../../../services/ApiService';
import { useApiMessage } from '../../../../../hooks/useApiMessage';
import InfoBox from '../../../../../components/common/InfoBox';
import { getUserId } from '../../../../../hooks/useGetUserId.js';
import { useRouter } from 'expo-router';

const api = new ApiService();

export default function RecipesProfileScreen() {

  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState('Todas');
  const [recipes, setRecipes] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, hasMore: true });
  const { info, callApiWithMessage, clearInfo } = useApiMessage();

  const fetchRecipes = useCallback(async (pageToFetch = 1) => {

    const userId = await getUserId();
  try {
    let response;

    if (selectedTag === 'Publicas') {
      response = await callApiWithMessage(() =>
        api.paginateRecipesPublicByUser(pageToFetch, 5, userId, true)
      );
    } else if (selectedTag === 'Privadas') {
      response = await callApiWithMessage(() =>
        api.paginateRecipesPublicByUser(pageToFetch, 5, userId, false)
      );
    } else {
      response = await callApiWithMessage(() =>
        api.paginateRecipesByUser(pageToFetch, 5, userId)
      );
    }

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
  }
}, [callApiWithMessage, selectedTag]);

  useEffect(() => {
    fetchRecipes(1);
  }, [selectedTag]);

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

  function SelectTags({ name = "Tag" }) {
  const isSelected = selectedTag === name;
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={() => setSelectedTag(name)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => [
        styles.tags,
        isSelected && styles.tagPressed,
        pressed && { backgroundColor: 'rgba(249, 215, 170, 0.5)' }
      ]}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <Text style={[
          styles.tagText,
          isSelected && { fontWeight: 'bold' }
        ]}>
          {name}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

  if (info.loading && pagination.page === 1) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF9100" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <InfoBox 
        message={info.message} 
        type={info.type} 
        onHide={clearInfo} 
        duration={2000} 
      />


      <View style={styles.row}>
        <SelectTags name="Todas" />
        <SelectTags name="Publicas" />
        <SelectTags name="Privadas" />
      </View>

      <RecipeItemList
        data={recipes}
        onEndReached={handleLoadMore}
        isFetchingMore={info.loading && pagination.page > 1}
        onPressRecipe={(recipe) => router.navigate({
          pathname: `/profile/recipes/${recipe.id}`,
          params: { userId: recipe.user_id._id}
        })}
        onRecipeDelete={() => fetchRecipes(1) }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  tags: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#FF9100',
    paddingVertical: 2,
    paddingHorizontal: "6%",
    alignItems: 'center',
  },
  tagPressed: {
    backgroundColor: '#F9D7AA'
  },
  tagText: {
    color: '#FF9100',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 5,
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    marginBottom: 10,
    marginTop: 20,
  },
  loaderContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
});