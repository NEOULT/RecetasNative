
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ThemedText from './common/ThemedText';

const RecipeCard = ({ avatar, username, rating, recipeImage, recipeTitle, isFavorite, onFavoriteToggle, onPressRecipe, onPressAvatar }) => {
  
  return (
    <View style={[styles.cardContainer]}>
      <TouchableOpacity onPress={onPressRecipe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onPressAvatar}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee' }]}>
              <Icon name="person-circle-outline" size={40} color="#bbb" />
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{username}</Text>
          <View style={styles.ratingContainer}>
            <Text>{rating}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onFavoriteToggle} style={styles.favIcon}>
          <Icon name={isFavorite ? 'heart' : 'heart-outline'} size={24} color="red" />
        </TouchableOpacity>
      </View>

      {/* Content (Image + Footer overlay) */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: recipeImage }} style={styles.recipeImage} />
        <View style={styles.footerOverlay}>
          <Text style={styles.recipeTitle}>{recipeTitle}</Text>
        </View>
      </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '90%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    margin: 10,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#666',
  },
  favIcon: {
    paddingLeft: 10,
  },
  imageContainer: {
    position: 'relative',
  },
  recipeImage: {
    width: '100%',
    height: 200,
  },
  footerOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
  },
  recipeTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecipeCard;
