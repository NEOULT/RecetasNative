import { View, Text, StyleSheet, Pressable } from 'react-native';
import ThemedText from './common/ThemedText';
import {useTheme} from '../styles/theme/ThemeContext';
import Feather from 'react-native-vector-icons/Feather';


export default function CategoryTag({ category, style = {}, onPressDelete }) {
    const { colors } = useTheme();
    return (
        <View style={[styles.container, {backgroundColor: colors.CategoryTag_color}, style]}>
        <ThemedText
            type='details'
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{flexShrink: 1}}
        >
            {category}
        </ThemedText>
        <Pressable onPress={onPressDelete}>
            <Feather name="x" size={16} color={colors.regular_textcolor} />
        </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        paddingVertical: 4,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        minWidth: 50,
        maxWidth: 300,

    },
    text: {
        fontSize: 14,
        color: '#333',
    },
})