import { View, Text } from 'react-native';

export default function RecipesScreen({ route }) {
    const { itemId } = route.params;
  
    return (
      <View>
        <Text>Detalles del ítem: {itemId}</Text>
      </View>
    );
  }