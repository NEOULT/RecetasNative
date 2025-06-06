import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import ThemedText from '../../../../../components/common/ThemedText';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useTheme } from '../../../../../styles/theme/ThemeContext.js';
import { ApiService } from '../../../../../services/ApiService';
import { useApiMessage } from '../../../../../hooks/useApiMessage';
import { convertIsoToTime } from '../../../../../hooks/useTimeIso.js';

const api = new ApiService();

export default function RecipeDetail() {
  const { colors } = useTheme();
  const { recipeId } = useLocalSearchParams();
  const { info, callApiWithMessage, clearInfo } = useApiMessage();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await callApiWithMessage(() => api.getRecipeById(recipeId));
        // Si tu API devuelve un array de recetas, toma la primera
        const data = Array.isArray(res.data.data) ? res.data.data[0] : res.data.data;
        setRecipe(data);
      } catch (e) {
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
    // Solo depende de recipeId
  }, [recipeId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#FF9100" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (!recipe) {
    return <Text>Receta no encontrada</Text>;
  }

  // Adaptar los campos a la estructura real
  const imageUrl = recipe.images?.[0]?.url;
  const avatarUrl = recipe.user_id?.profileImage;
  const username = recipe.user_id ? `${recipe.user_id.name} ${recipe.user_id.lastName}` : '';
  const rating = recipe.averageRating ?? 0;
  const servings = recipe.servings;
  const difficulty = recipe.difficulty; // Ojo: en tu objeto es "dificulty"
  const {time, unit} = convertIsoToTime(recipe.preparation_time) || 'No especificado';
  const ingredients = recipe.ingredients ?? [];
  const steps = recipe.steps ?? [];
  
  return (
    <ScrollView style={{ marginBottom: 20 }}>
      <View style={{ gap: 10 }}>
        <Image
          source={{ uri: imageUrl }}
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
                />}
            >
              {time} {unit}
            </ThemedText>
            <ThemedText
              type="details"
              icon={
                <MaterialIcons
                  name="whatshot"
                  size={22}
                  color={
                    difficulty === 'easy' ? 'green' :
                      difficulty === 'medium' ? '#ffe806' :
                        difficulty === 'hard' ? 'red' :
                          'gray'
                  }
                />
              }
            >{difficulty}</ThemedText>
            <ThemedText
              type="details"
              icon={
                <Feather
                  name="user"
                  size={20}
                  color={colors.regular_textcolor}
                />
              }
            >{servings} porciones</ThemedText>
          </View>

          <View style={styles.row}>
            <View style={styles.subrow}>
              <Image
                source={{ uri: avatarUrl }}
                style={styles.avatar}
                resizeMode="cover"
              />
              <ThemedText type="details" maxLength={15}>
                {username}
              </ThemedText>
            </View>
            <View style={styles.subrow}>
              
              <ThemedText type="details" style={{ marginLeft: 5 }}>
                {rating?.toFixed(1)}
              </ThemedText>
            </View>
          </View>

          <ThemedText type="subtitle1" style={{ marginTop: 10 }}>
            Ingredientes
          </ThemedText>

          <View>
            {ingredients.map((ingredient, index) => (
              <View key={index} style={[styles.row, { paddingHorizontal: 10 }]}>
                <View style={styles.subrow}>
                  <ThemedText type="default" style={{ fontWeight: 'bold', marginRight: 6 }}>•</ThemedText>
                  {/* Ajusta los campos según tu modelo de ingrediente */}
                  <ThemedText type="default">{ingredient.ingredient_quantity ?? ''}</ThemedText>
                  <ThemedText type="default">{ingredient.ingredient_name ?? ''}</ThemedText>
                </View>
                <View style={styles.subrow}>
                  <ThemedText type="default">{ingredient.unit_quantity ?? ''} {ingredient.unit ?? ''}</ThemedText>
                </View>
              </View>
            ))}
          </View>

          <ThemedText type="subtitle1" style={{ marginVertical: 10 }}>
            Preparación
          </ThemedText>

          <View style={{ gap: 35 }}>
            {steps.map((step, index) => (
              <View key={index} style={[styles.column, { minWidth: '100%' }]}>
                <View style={[styles.column, styles.cardContainer]}>
                  <View style={[styles.row, styles.cardContent]}>
                    <ThemedText type="subtitle3">
                      Paso {index + 1}
                    </ThemedText>
                  </View>
                  {/* Mostrar imagen del paso si existe */}
                  {step.stepImage && (
                    <Image
                      source={{ uri: step.stepImage }}
                      style={styles.stepImage}
                      resizeMode="cover"
                    />
                  )}
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
  cardContainer: {
    backgroundColor: '#dadada',
    borderRadius: 10,
  },
  cardContent: {
    paddingHorizontal: 16
  },
  stepImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  }
});