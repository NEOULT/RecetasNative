import { StyleSheet, View, Pressable} from 'react-native';
import Feather from '@expo/vector-icons/Feather';

export default function DeleteButton({ position, onPress, scale = 1 }) {
    return (
        <Pressable style={[styles.button, position, {transform: [{scale}]} ]} onPress={onPress}>
            <Feather name="x" size={17} color="#FF4646"  />
        </Pressable>
    );
}

const styles = StyleSheet.create({ 
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 25,
        height: 25,
        backgroundColor: '#FFB7B7',
        borderRadius: 5,
        borderColor:'#FF6565',
        borderWidth: 1,
    },
});