import { StyleSheet, Text, View } from 'react-native';

export default function RecipesProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Text>Search</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20
  },
  search: {
    width: "100%",
    backgroundColor: 'gray',
    borderRadius: 10,
    padding: 10,
  }
});