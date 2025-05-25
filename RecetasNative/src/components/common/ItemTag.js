import { View, Text, StyleSheet } from 'react-native';

export default function ItemTag({ number, color = '#FFAE67', position, numberStyle, scale = 1 }) {
    return (
        <View style={[styles.circle, {backgroundColor: color, transform: [{scale}]}, position]}>
            <Text style={[styles.number, numberStyle]}>{number}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    circle: {
        width: 33,
        height: 30,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    number: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    }
})