import { StyleSheet, View, Image, ActivityIndicator, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ThemedText from '../../../../../components/common/ThemedText';
import ThemedButton from '../../../../../components/common/ThemedButton';
import RecipeItem from '../../../../../components/RecipeItem';
import { ApiService } from '../../../../../services/ApiService';
import { useApiMessage } from '../../../../../hooks/useApiMessage';
import { useEffect, useState, useCallback } from 'react';


const api = new ApiService();

export default function GrupoScreen() {
  const { info, callApiWithMessage, clearInfo } = useApiMessage();
  const { groupId, group, userId = null } = useLocalSearchParams();

  const router = useRouter();
  const groupObj = group ? JSON.parse(group) : null;
  
  const [recipes, setRecipes] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, hasMore: true });
  const [loading, setLoading] = useState(true);

  const fetchRecipes = useCallback(async (pageToFetch = 1) => {
    setLoading(true);
    try {
      const res = await callApiWithMessage(() =>
        api.paginateRecipesByGroup(pageToFetch, 5, groupId)
      );

      setRecipes(prev =>
        pageToFetch === 1
          ? res.data.data
          : [...prev, ...res.data.data]
      );
      setPagination({
        page: pageToFetch,
        hasMore: pageToFetch < res.data.totalPages,
      });
    } catch (e) {
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, [callApiWithMessage, groupId]);

  useEffect(() => {
    fetchRecipes(1);
  }, [groupId]);

  const handleLoadMore = () => {
    if (pagination.hasMore && !loading) {
      fetchRecipes(pagination.page + 1);
    }
  };

  const handlePressRecipe = (recipe) => {

    if (userId){
      router.navigate({
        pathname: `/profile/groups/${groupId}/${recipe._id}`,
        params: { userId }
      });
      return;
    }else{
      router.navigate({
      pathname: `/groups/${groupId}/${recipe._id}`,
      })
    }
  };

  const renderHeader = () => (
    <>
      <Image
        source={{
          uri: groupObj.image
        }}
        style={styles.groupImage}
      />
      <View style={styles.container}>
        <View style={styles.column}>
          <View style={[styles.row, { marginTop: 10 }]}>
            <View style={{ width: '77%' }}>
              <ThemedText type="title" textAlign='left'>{groupObj.name}</ThemedText>
            </View>
            <ThemedButton
              type="primary"
              onPress={() => console.log('Unirse al grupo')}
              style={{ paddingVertical: 2, width: '23%' }}
              title="Unirse"
            />
          </View>
          <View style={styles.subrow}>
            <ThemedText type="details" textAlign='left'>
              {recipes?.length || 0} recetas
            </ThemedText>
            <ThemedText type="default" style={{ fontWeight: 'bold', marginRight: 6 }}>•</ThemedText>
            <ThemedText type="details" textAlign='left'>
              {groupObj.groupMembers?.length || 0} miembros
            </ThemedText>
          </View>
        </View>
        <ThemedText type="subtitle2">{groupObj.description}</ThemedText>
        <View style={[styles.row, { marginVertical: 10 }]}>
          <ThemedText type="subtitle1">Recetas</ThemedText>
        </View>
      </View>
    </>
  );

  const renderItem = ({ item }) => (
    <View style={{ paddingHorizontal: 20 }}>
      <RecipeItem
        imageUrl={item.images?.[0]?.url || item.imageUrl}
        title={item.title}
        time={item.time || item.preparation_time}
        difficulty={item.difficulty}
        servings={item.servings}
        rating={item.rating}
        onPressRecipe={() => handlePressRecipe(item)}
      />
    </View>
    
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={recipes}
        renderItem={renderItem}
        keyExtractor={(item, index) => item._id?.toString() || index.toString()}
        ListHeaderComponent={renderHeader}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && pagination.page > 1 ? (
            <ActivityIndicator size="small" color="#FF9100" />
          ) : null
        }
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 8,
  },
  groupImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  row: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  subrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  column: {
    flexDirection: 'column',
    gap: 1,
    alignItems: 'flex-start',
    width: '100%',
  },
});