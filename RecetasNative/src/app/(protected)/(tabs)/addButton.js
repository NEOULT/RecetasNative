import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../../../components/common/ThemedText';
export default function addScreen() {
  return (
    <View style={styles.container}>
      <ThemedText type="title">
        Hola mundo
      </ThemedText>
      <ThemedText type="subtitle1">
        Hola mundo
      </ThemedText>
      <ThemedText type="subtitle2">
        Hola mundo
      </ThemedText>
      <ThemedText type="default">
        Hola mundo
      </ThemedText>
      <ThemedText type="details">
        Hola mundo
      </ThemedText>
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