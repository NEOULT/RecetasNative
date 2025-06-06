import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native';
import ThemedText from '../../../../components/common/ThemedText';
import ThemedButton from '../../../../components/common/ThemedButton';
import Feather from '@expo/vector-icons/Feather';
import { useTheme } from '../../../../styles/theme/ThemeContext'
import RecipeItemV2 from '../../../../components/RecipeItemV2';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { ApiService } from '../../../../services/ApiService';
import InfoBox from '../../../../components/common/InfoBox';
import { useApiMessage } from '../../../../hooks/useApiMessage';
import { getUserId } from '../../../../hooks/useGetUserId';

const api = new ApiService();


export default function ProfileScreen() {

  const { colors } = useTheme();
  const [user, setUser] = useState(null);
  const { info, callApiWithMessage, clearInfo } = useApiMessage();

  const user2 = {
    username: 'ChefMaster',
    avatar: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg',
    recipes: 120,
    groups: 5,
    followers: 300,
    following: 150
  }

  const router = useRouter();

  useEffect(() => {
  async function fetchUser() {
    try {
      const userId = await getUserId();
      console.log('ID del usuario:', userId);
      
      const res = await callApiWithMessage(() => api.getProfile(userId));
      const userData = res.data.user.user;
      const recipes = res.data.user.recipes;

      console.log('Datos del usuario:', userData);

      const mappedUser = {
        username: `${userData.name} ${userData.lastName}`,
        avatar:
          (recipes[0]?.images[0]?.url) ?? 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg',
        recipes: recipes.length,
        groups: userData.createdGroups?.length || 0,
        followers: userData.followers?.length || 0,   // <-- No existe, será 0
        following: userData.following?.length || 0,   // <-- No existe, será 0
        recipesList: recipes,
        groupsList: userData.createdGroups || []
      };
      setUser(mappedUser);
    } catch (e) {
      setUser(null);
    }
  }
  fetchUser();
}, []);

  const handleSeeMoreRecipes = () => {
    router.push('/profile/recipes');
  }
  const handleSeeMoreGroups = () => {
    router.push('/profile/groups');
  }

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

      <ThemedButton title="Seguir"/>

      <View style={[styles.row, styles.barProfile, {backgroundColor: colors.card}]}>
        <ItemBarProfile value={user.recipes} title="recipes" />
        <ItemBarProfile value={user.groups} title="groups" />
        <ItemBarProfile value={user.followers} title="followers" />
        <ItemBarProfile value={user.following} title="following" />
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
              <Image
                key={group._id}
                source={{ uri: group.image ?? 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' }}
                style={{ width: 300, height: 150, borderRadius: 10, marginRight: 10 }}
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