import {View, TextInput, StyleSheet} from 'react-native';
import ImageSelector from './common/ImagePicker';
import ItemTag from './common/ItemTag';
import DeleteButton from './common/DeleteButton';

export default function StepItem({ step = 1, onPress = () => {console.log('Hola');}}) {
    return (
        <View style={styles.container}>
            <ItemTag
                number={step}
                position={{ position: "absolute", top: -15, left: -13 }}
                scale={0.9}
            />
            <ImageSelector width={'90%'} height={125}/>
            <TextInput
                placeholder="Escribe el paso"
                placeholderTextColor="gray"
                style={[styles.input, { width: "90%" }]}
                keyboardType="default"
                autoCapitalize="none"
                multiline={true}
            />
            <DeleteButton
                onPress={onPress}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        width: '90%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFEDDE',
        borderColor: '#FFB7B7',
        borderWidth: 1,
        paddingVertical: 12,
        gap: 10,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#B3B3B3",
        maxHeight: 100,
        minHeight: 60,
        color: "black",
        backgroundColor:"white",
        fontSize: 16,
        paddingHorizontal: 8,
        paddingTop: 2,
        textAlignVertical: 'top',
    },
});