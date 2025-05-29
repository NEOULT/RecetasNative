import { useLocalSearchParams } from 'expo-router';
import { Text, View, Image, StyleSheet, ScrollView} from 'react-native';
import ThemedText from '../../../../../components/common/ThemedText';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useTheme } from '../../../../../styles/theme/ThemeContext.js';
import { StarRatingDisplay } from 'react-native-star-rating-widget';


const recipeDetails = {
      id: 1,
      avatar: 'https://i.postimg.cc/J7KRWYkV/chad.jpg',
      username: 'Chef John',
      rating: 4.5,
      servings: 5,
      preparationTime: '30 min',
      image: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg',
      title: 'Spaghetti Carbonara con Hojas de Romero',
      description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper. It is simple yet delicious, perfect for a quick weeknight dinner.',
      difficulty: 'easy',
      ingredients:[
        { name: 'Spaghetti', unitQuantity: 200, unit: 'g', ingredientQuantity: 1 },
        { name: 'Pancetta', unitQuantity: 100, unit: 'g', ingredientQuantity: 1 },
        { name: 'Eggs', unitQuantity: 2, unit: 'pcs', ingredientQuantity: 1 },
        { name: 'Parmesan cheese', unitQuantity: 50, unit: 'g', ingredientQuantity: 1 },
        { name: 'Black pepper', unitQuantity: 1, unit: 'tsp', ingredientQuantity: 1 },
        { name: 'Salt', unitQuantity: 20, unit: 'gm', ingredientQuantity: null },
      ],
      steps: [
        { stepImage: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg', description: 'Cook the spaghetti in salted boiling water until al dente. Cook the spaghetti in salted boiling water until al dente. Cook the spaghetti in salted boiling water until al dente.' },
        { stepImage: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg', description: 'In a pan, cook the pancetta until crispy. Cook the spaghetti in salted boiling water until al dente. Cook the spaghetti in salted boiling water until al dente.' },
        { stepImage: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg', description: 'Beat the eggs and mi, Cook the spaghetti in salted boiling water until al dente., Cook the spaghetti in salted boiling water until al dente.' },
        { stepImage: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg', description: 'Combine the spaghetti with pancetta and remove from heat.' },
        { stepImage: 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg', description: 'Quickly add the egg mixture to the pasta, stirring to create a creamy sauce.' },
        { stepImage: null, description: 'Season with black pepper and serve immediately.' },
      ],
};

export default function RecipeDetail() {

  const { colors } = useTheme();
  
  const { recipeId } = useLocalSearchParams();

  console.log(`Recipe ID: ${recipeId}`);
  
  const recipe = recipeDetails;
  
  if (!recipe) {
    return <Text>Receta no encontrada</Text>;
  }

  return (

    <ScrollView style={{ marginBottom: 20}}>

      <View style={{ gap: 10}}>

        <Image
          source={{ uri: recipe.image }}
          style={styles.recipeImage}
        />

        <View style={styles.container}>

          <ThemedText type="title" textAlign='left'>{recipe.title}</ThemedText>
          <ThemedText type="subtitle2">{recipe.description}</ThemedText>

          <View style={styles.row}>

            <ThemedText 
              type="details" 
              icon={
                <FontAwesome6
                  name="clock" 
                  size={20} 
                  color={colors.regular_textcolor}   
                />}>
                {recipe.preparationTime}
            </ThemedText>
            <ThemedText 
              type="details"
              icon={
                <MaterialIcons 
                name="whatshot" 
                size={22} 
                color={
                    recipe.difficulty === 'easy' ? 'green' :
                    recipe.difficulty === 'medium' ? '#ffe806' :
                    recipe.difficulty === 'hard' ? 'red' :
                    'gray'
                  } 
                />
                }   
              >{recipe.difficulty}</ThemedText>
            <ThemedText 
              type="details"
              icon={
                <Feather 
                  name="user" 
                  size={20} 
                  color={colors.regular_textcolor}
                />
              }
              >{recipe.servings} porciones</ThemedText>

          </View>

          <View style={styles.row}>
            
            <View style={styles.subrow}>

              <Image
                source={{ uri: recipe.avatar }}
                style={styles.avatar}
                onPress={() => console.log('Avatar pressed')}
                resizeMode="cover"
              />
              <ThemedText 
                type="details" 
                >
                {recipe.username}
              </ThemedText>
              
            </View>
            <View style={styles.subrow}>
              <StarRatingDisplay rating={recipe.rating} color='#ecc800' starSize={23} starStyle={{marginHorizontal: 1}}/>
              <ThemedText type="details" style={{ marginLeft: 5 }}>
                {recipe.rating.toFixed(1)}
              </ThemedText>
            </View>

          </View>
                
          <ThemedText type="subtitle1" style={{ marginTop: 10 }}>
            Ingredientes 
          </ThemedText>

          <View>
            {recipe.ingredients.map((ingredient, index) => (
              <View key={index} style={[styles.row, {paddingHorizontal: 10}]}>
                
                <View style={styles.subrow}>
                  <ThemedText type="default" style={{ fontWeight: 'bold', marginRight: 6 }}>•</ThemedText>
                  <ThemedText type="default">{ingredient.ingredientQuantity}</ThemedText>
                  <ThemedText type="default">{ingredient.name}</ThemedText>
                </View>
                <View style={styles.subrow}>
                  <ThemedText type="default">{ingredient.unitQuantity} {ingredient.unit}</ThemedText>
                </View>
              </View>
            ))}
          </View>

          <ThemedText type="subtitle1" style={{ marginVertical: 10 }}>
            Preparación
          </ThemedText>

          <View style={{gap: 35}}>
            {recipe.steps.map((step, index) => (
              <View key={index} style={[styles.column]}>
                
                <View style={[styles.column, styles.cardContainer]}>

                  <View style={[styles.row,styles.cardContent]}>
                    <ThemedText type="subtitle3">
                      Step {index + 1}
                    </ThemedText>
                  </View>

                  { step && step.stepImage && (<Image
                    source={{ uri: step.stepImage }}
                    style={styles.stepImage}
                    resizeMode="cover"
                  />)}
                  
                  
                </View>

                <View>
                    <ThemedText type="subtitle2">
                    {step.description}
                    </ThemedText>
                  </View>
              </View>
            ))}

          </View>

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
  row: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,

  },
  subrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  column: {
    flexDirection: 'column',
    gap: 10,
    alignItems: 'left'
  },
  cardContainer:{
    backgroundColor: '#dadada',
    borderRadius: 10,
  },
  cardContent:{
    paddingHorizontal: 16
  },
  stepImage:{
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  avatar:{
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  }
});
