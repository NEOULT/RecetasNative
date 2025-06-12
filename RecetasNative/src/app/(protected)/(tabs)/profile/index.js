import { StyleSheet, Text, View, Image, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import ThemedText from '../../../../components/common/ThemedText';
import ThemedButton from '../../../../components/common/ThemedButton';
import Feather from '@expo/vector-icons/Feather';
import { useTheme } from '../../../../styles/theme/ThemeContext'
import RecipeItemV2 from '../../../../components/RecipeItemV2';
import { useRouter } from 'expo-router';
import { useState, useEffect, useCallback } from 'react';
import { ApiService } from '../../../../services/ApiService';
import InfoBox from '../../../../components/common/InfoBox';
import { useApiMessage } from '../../../../hooks/useApiMessage';
import { getUserId } from '../../../../hooks/useGetUserId';
import { useFocusEffect } from '@react-navigation/native';
import GroupCardV2 from '../../../../components/GroupCardV2';

const api = new ApiService();

export default function ProfileScreen({ userId : propUserId }) {

  const { colors } = useTheme();
  const [user, setUser] = useState(null);
  const [authUserId, setAuthUserId] = useState(null);
  const [loading, setLoading] = useState(true); 
  const { info, callApiWithMessage, clearInfo } = useApiMessage();
  
  const router = useRouter();
  console.log(propUserId);

  useFocusEffect(
    useCallback(() => {
      async function fetchUser() {
        setLoading(true); 
        try {
          const userId = propUserId || await getUserId();
          setAuthUserId(await getUserId());

          const res = await callApiWithMessage(() => api.getProfile(userId));
          const userData = res.data.user.user;
          const recipes = res.data.user.recipes;
          
          const mappedUser = {
            _id: userData._id,
            username: `${userData.name} ${userData.lastName}`,
            avatar: userData.profileImage ?? 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg',
            recipes: recipes.length,
            groups: userData.createdGroups?.length || 0,
            followers: userData.followers?.length || 0,
            following: userData.following?.length || 0,
            recipesList: recipes,
            groupsList: userData.createdGroups || [],
            followingList: userData.following || [],
            followersList: userData.followers || [],
          };
          setUser(mappedUser);

        } catch (e) {
          setUser(null);
        } finally {
          setLoading(false);
        }
      }
      fetchUser();
    }, [propUserId])
  );

  const handleSeeMoreRecipes = () => {
    router.push('/profile/recipes');
  }
  const handleSeeMoreGroups = () => {
    router.push('/profile/groups');
  }

  const handlerPressFollowButton = async () => {
    await callApiWithMessage(() => api.toggleFollowUser(authUserId, user._id));
    // Vuelve a cargar el perfil actualizado
    try {
      const res = await callApiWithMessage(() => api.getProfile(user._id));
      const userData = res.data.user.user;
      const recipes = res.data.user.recipes;

      const followersArr = Array.isArray(userData.followers) ? userData.followers : [];
      const followingArr = Array.isArray(userData.following) ? userData.following : [];

      const mappedUser = {
        _id: userData._id,
        username: `${userData.name} ${userData.lastName}`,
        avatar: userData.profileImage ?? 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg',
        recipes: recipes.length,
        groups: userData.createdGroups?.length || 0,
        followersList: followersArr,
        followingList: followingArr,
        followers: followersArr.length,
        following: followingArr.length,
        recipesList: recipes,
        groupsList: userData.createdGroups || [],
      };
      setUser(mappedUser);
    } catch (e) {
      // Maneja el error si lo deseas
    }
  };

  const ItemBarProfile = ({value, title}) => {
    return(
      <View style={[styles.column, {gap: 0}]}>
        <ThemedText type="subtitle3" style={{fontWeight:'bold'}}>{value}</ThemedText>
        <ThemedText type="details">{title}</ThemedText>
      </View>
    )
  }

  const SeeMoreButton = ({title, onPress}) => {
    return (
      <Pressable onPress={onPress} style={[styles.row, styles.seeMoreButton]}>
        <ThemedText type="subtitle1">{title}</ThemedText>
        <Feather name="chevron-right" size={30} color="black" />
      </Pressable>
    );
  }

  if (loading) {
    return (
      <View style={[styles.container, {justifyContent: 'center', alignItems: 'center', flex: 1}]}>
        <ActivityIndicator size="large" color="#FF9100" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <ThemedText type="title" textAlign='center'>No hay datos de usuario disponibles</ThemedText>
      </View>
    );
  }

  return (
  <ScrollView>
    <View style={styles.container}>
      <View style={styles.column}>
        <Image
          source={{ uri: user.avatar }}
          style={styles.avatar}
        />
        <ThemedText type='subtitle3'>{user.username}</ThemedText>
      </View>

      {/* Solo muestra el botón si el perfil NO es el del usuario autenticado */}
      {user._id !== authUserId && (
        user?.followersList?.includes(authUserId) ? 
        <ThemedButton onPress={() => handlerPressFollowButton(user._id)} title="Dejar de Seguir" /> :
        <ThemedButton onPress={() => handlerPressFollowButton(user._id)} title="Seguir" />
      )}

      <View style={[styles.row, styles.barProfile, {backgroundColor: colors.card}]}>
        <ItemBarProfile value={user.recipes} title="recetas" />
        <ItemBarProfile value={user.groups} title="grupos" />
        <ItemBarProfile value={user.followers} title="Seguidores" />
        <ItemBarProfile value={user.following} title="Seguidos" />
      </View>

      <View style={[styles.column, {alignSelf: 'stretch'}]}>
        <SeeMoreButton title="Recetas publicadas" onPress={handleSeeMoreRecipes} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {user.recipesList.map(recipe => (
              <RecipeItemV2
                key={recipe._id}
                imageUrl={recipe.images[0]?.url ?? 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg'}
                title={recipe.title}
              />
            ))}
        </ScrollView>
      </View>

      <View style={[styles.column, {alignSelf: 'stretch', gap: 10}]}>
        <SeeMoreButton title="Grupos de cocina" onPress={handleSeeMoreGroups} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {user.groupsList.map(group => (
              <GroupCardV2
                key={group._id}
                group={group}
                onPress={() => console.log('Grupo seleccionado:', group.name)}
              />
            ))}
          </ScrollView>
      </View>

    </View>
  </ScrollView>
  
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 20
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  barProfile:{
    paddingVertical: 5,
    paddingHorizontal: 15, 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 1.41, 
    elevation: 5 
  },
  seeMoreButton:{
    justifyContent: 'space-between',
    width: '100%',
  }
});