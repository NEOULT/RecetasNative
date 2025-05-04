import { StyleSheet, Text, View } from 'react-native';

export default function addScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'semibold' }}>
        Aquí va el modal para agregar recetas o grupos, tambien se puede hacer con expo router
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});