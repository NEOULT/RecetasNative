import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../../styles/theme/ThemeContext';

const { width, height } = Dimensions.get('window'); // Obtiene las dimensiones de la pantalla

function Layout() {
  const { colors } = useTheme(); // Obtiene los colores del tema actual
  return (
    <View id='HeaderContent' style={[styles.HeaderContainer,{ backgroundColor: colors.layout_backgroundcolor}]}>
      {/* Primer div vacío que ocupa espacio */}
      <View style={styles.EmptySpace} />

      {/* Segundo div que contiene el contenido */}
      <View id='HeaderContent' style={[styles.HeaderContent, { backgroundColor: colors.layout_backgroundcolor }]}>
        <Text style={{backgroundColor: colors}}>Search</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  HeaderContainer: {
    height: height * 1, // Ocupa el 17.44% de la altura de la pantalla
    justifyContent: 'space-between', // Espacia los elementos dentro del contenedor
    alignItems: 'center',
    borderWidth: width * 0.01, // Borde dinámico basado en el 1% del ancho de la pantalla
  },
  EmptySpace: {
    flex: 1, // Ocupa el espacio vacío en la parte superior
  },
  HeaderContent: {
    width: width * 0.9, // Ancho dinámico basado en el 90% del ancho de la pantalla
    height: height * 0.09, // Altura del contenido del segundo div
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Bordes redondeados
    borderWidth: width * 0.01, // Borde dinámico basado en el 1% del ancho de la pantalla
  },
});

export default Layout;