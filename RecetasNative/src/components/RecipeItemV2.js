import {View, StyleSheet, Image} from 'react-native';
import { useTheme } from '../styles/theme/ThemeContext';
import ThemedText from './common/ThemedText';

export default function RecipeItemV2({ imageUrl, title }) {

    const {isDark } = useTheme();

    return (
        <View style={[styles.container, {backgroundColor: isDark ? '#2c2c2c' : 'white', borderColor: isDark ? 'transparent' : '#d2d2d2'}]}>
            <Image 
                source= {{
                    uri: imageUrl || 'https://i.postimg.cc/9f3hBvvT/pasta1.jpg',
                }}
                style={styles.image}/>
            <ThemedText
                numberOfLines={2}
                ellipsizeMode="tail"
                textAlign='left'
                style={styles.title}
                
            >
                {title}
            </ThemedText>
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
        width: 150,
        marginRight: 10,
    },
    image: {
        width: "100%",
        height: 100,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        resizeMode: 'cover',
    },
    title: {
        fontWeight: 600,
        maxWidth: 130,
        paddingVertical: 8,
        paddingHorizontal: 5,
    },
});