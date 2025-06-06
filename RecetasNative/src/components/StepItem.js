import { View, StyleSheet } from 'react-native';
import ImageSelector from './common/ImagePicker';
import ItemTag from './common/ItemTag';
import DeleteButton from './common/DeleteButton';
import InputV1 from './common/InputV1';

export default function StepItem({ recipe, step = 0, onPressDelete = () => {}, value = {}, onChange }) {
    return (
        <View style={styles.container}>
        <ItemTag
            number={step}
            position={{ position: "absolute", top: -15, left: -13 }}
            scale={0.9}
        />

        <ImageSelector
            width={'90%'}
            height={125}
            value={value.stepImage}
            onChange={(imageUri) => {
            onChange({ ...value, stepImage: imageUri });
            }}
            uploadType="recipe_step"
            uploadMetadata={{recipeId: recipe, step_number: step }}
        />

        <InputV1
            placeholder="Ingrese el paso"
            width="90%"
            height={100}
            multiline
            value={value.description}
            onChangeText={(description) => onChange({ ...value, description })}
        />

        <DeleteButton onPress={onPressDelete} />
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFEDDE',
        borderColor: '#FFB7B7',
        borderWidth: 1,
        paddingVertical: 12,
        gap: 10,
        flexDirection: 'column',
    },
});