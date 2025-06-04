import { StyleSheet, Text, View, Image , ScrollView} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ThemedText from '../../../../../components/common/ThemedText';
import ThemedButton from '../../../../../components/common/ThemedButton';
import RecipeItem from '../../../../../components/RecipeItem';

export default function GrupoScreen() {

  const groups = {
      id: 1,
      image: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg',
      title: 'Recetas Mexicanas',
      description: 'Un grupo para compartir las mejores recetas de la cocina mexicana, desde tacos hasta mole.',
      recipesCount: 10,
      membersCount: 8,
  };

  const sampleData = [
        { imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg', title: 'Receta 1', time: '30 min', difficulty: 'Fácil', servings: 4, rating: 4.5},
        { imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg', title: 'Receta 2', time: '45 min', difficulty: 'Intermedio', servings: 2, rating: 4.0 },
        { imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg', title: 'Receta 3', time: '1 hora', difficulty: 'Difícil', servings: 6, rating: 5.0 },
        { imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg', title: 'Receta 4', time: '20 min', difficulty: 'Fácil', servings: 4, rating: 3.5 },
        { imageUrl: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg', title: 'Receta 5', time: '15 min', difficulty: 'Fácil', servings: 2, rating: 4.8 },
      ];

  

  const { groupId } = useLocalSearchParams();

  const group = groups
  //console.log(`Grupo ID: ${group.image}`);

  const handlePressRecipe = (recipe) => {
        //console.log('Categoría seleccionada:', recipe.title);
    }

  return (
    <ScrollView>
      <Image
        source={{ uri: group.image }}
        style={styles.groupImage}
      />
      <View style={styles.container}>
        
        <View style={styles.column}>
          <View style={[styles.row, { marginTop: 10 }]}>
            <View style={{ width: '77%' }}>
              <ThemedText type="title" textAlign='left'>{group.title}</ThemedText>
            </View>
            
            <ThemedButton
              type="primary"
              onPress={() => console.log('Unirse al grupo')}
              style={{ paddingVertical: 2, width: '23%'}}
              title="Unirse"
            />
          </View>
          <View style={styles.subrow}>
            <ThemedText type="details" textAlign='left'>
              {group.recipesCount} recetas
            </ThemedText>
            <ThemedText type="default" style={{ fontWeight: 'bold', marginRight: 6 }}>•</ThemedText>
            <ThemedText type="details" textAlign='left'>
              {group.membersCount} miembros
            </ThemedText>
          </View>
        </View>
        <ThemedText type="subtitle2">{group.description}</ThemedText>

        <View style={styles.row}>
          <ThemedText type="subtitle1">Recetas</ThemedText>
        </View>
        
        <View style={{ width: '100%' }}>
        {sampleData.map((recipe, index) => (
          <RecipeItem
            key={index}
            imageUrl={recipe.imageUrl}
            title={recipe.title}
            time={recipe.time}
            difficulty={recipe.difficulty}
            servings={recipe.servings}
            rating={recipe.rating}
            onPressRecipe={() => handlePressRecipe(recipe)}
          />
        ))}
        </View>
      </View>
      
    </ScrollView>
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
    alignItems: 'left',
    width: '100%',
  },
});