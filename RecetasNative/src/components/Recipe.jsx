import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function RecipeCard({recipe}) {
    return (
        <Link href={{
            pathname: `/recipes/[recipeId]`,
            params: { id: recipe.id },
          }} asChild>
            <Pressable style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}>
                <View style={styles.container} key={recipe.id}>
                    <Text style={styles.title}>{`Soy el componente ${recipe.id}`}</Text>
                </View>
            </Pressable>
        </Link>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8', // Fondo claro
    borderRadius: 10, // Bordes redondeados
    padding: 20, // Espaciado interno
    marginVertical: 10, // Espaciado entre tarjetas
    marginHorizontal: 15, // Espaciado lateral
    shadowColor: '#000', // Sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Sombra en Android
  },
  title: {
    fontSize: 18, // Tamaño de fuente
    fontWeight: 'bold', // Negrita
    color: '#333', // Color del texto
    textAlign: 'center', // Centrar texto
  },
  pressable: {
    borderRadius: 10, // Bordes redondeados para el botón
    overflow: 'hidden', // Evitar que el contenido sobresalga
  },
  pressed: {
    opacity: 0.8, // Efecto de opacidad al presionar
  },
});