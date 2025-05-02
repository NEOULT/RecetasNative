import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { StarRatingDisplay } from 'react-native-star-rating-widget';

const RecipeItem = ({ imageUrl, title, time, difficulty, servings, rating, onPressRecipe }) => {
  return (
    <TouchableOpacity onPress={onPressRecipe}>
        <View style={styles.container}>
            <Image source={{ uri: imageUrl }} style={styles.image} />

            <View style={styles.infoContainer}>
                <Text style={styles.title}>{title}</Text>

                <View style={styles.row}>
                <Feather name="clock" size={14} color="#666" />
                <Text style={styles.text}>{time}</Text>

                <MaterialIcons name="whatshot" size={14} color="#666" style={styles.iconSpacing} />
                <Text style={styles.text}>{difficulty}</Text>
                </View>

                <View style={styles.row}>
                <Feather name="user" size={14} color="#666" />
                <Text style={styles.text}>{servings} porciones</Text>

                <View style={[styles.iconSpacing, styles.starContainer]}>
                    <StarRatingDisplay rating={rating} starSize={14} starStyle={{ marginHorizontal: 1 }} />
                </View>
                </View>
            </View>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  image: {
    width: 90,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 1)',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  text: {
    marginLeft: 4,
    fontSize: 13,
    color: '#333',
  },
  iconSpacing: {
    marginLeft: 12,
  },
  starContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default RecipeItem;
