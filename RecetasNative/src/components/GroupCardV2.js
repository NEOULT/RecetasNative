import { View, StyleSheet, Image, Pressable } from 'react-native';
import { useTheme } from '../styles/theme/ThemeContext';
import ThemedText from './common/ThemedText';

export default function GroupCardV2({ group, onPress }) {
    const { isDark } = useTheme();

    return (
        <Pressable onPress={onPress} style={({ pressed }) => [
        styles.container,
        { backgroundColor: isDark ? '#2c2c2c' : '#fff', borderColor: isDark ? 'transparent' : '#d2d2d2', opacity: pressed ? 0.85 : 1 }
        ]}>
        <Image
            source={{ uri: group.image ?? 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg' }}
            style={styles.image}
        />

        <View style={{alignSelf: 'flex-start'}}>
            <ThemedText
            numberOfLines={2}
            ellipsizeMode="tail"
            textAlign="left"
            style={styles.title}
            >
            {group.name}
        </ThemedText>
        </View>
      
        </Pressable>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    width: 250,
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    resizeMode: 'cover',
  },
  title: {
    fontWeight: '600',
    maxWidth: 230,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
});