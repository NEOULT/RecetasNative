import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Pressable } from 'react-native';

const ImageCard = ({ title, imageUrl, onPress }) => {
  return (
    <View style={styles.shadowContainer}>
        <Pressable onPress={() =>{ onPress }}
            style={({pressed}) =>[{ flex: 1, borderRadius: 16, overflow: 'hidden', opacity: pressed ? 0.3 : 1 }]} // Asegúrate de que el Pressable ocupe todo el espacio del contenedor
            >
            <ImageBackground
                source={{ uri: imageUrl }}
                style={styles.image}
                imageStyle={styles.imageStyle}
            >
                <View style={styles.overlay} />
                <Text style={styles.title}>{title}</Text>
            </ImageBackground>
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 10,
    backgroundColor: '#fff',
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 80, 200, 0.3)', // filtro azulado
    borderRadius: 16,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 1,
  },
});

export default ImageCard;