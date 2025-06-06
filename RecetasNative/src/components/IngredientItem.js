import { View, Text, StyleSheet, TextInput } from "react-native";
import ItemTag from '../components/common/ItemTag';
import DeleteButton from '../components/common/DeleteButton';
import InputV1 from "./common/InputV1";
import ThemedText from "./common/ThemedText";
import SelectPicker from "./common/SelectPicker";
import { unitOptions } from "../constants/options";

export default function IngredientItem({ value = {}, onChange, onPressDelete }) {

    return (
        <View style={styles.container}>
            <ItemTag
                number={1}
                position={{ position: "absolute", top: -15, left: -13 }}
                scale={0.9}
            />

            <DeleteButton
                position={{ position: "absolute", right: -10 }}
                onPress={onPressDelete}
            />

            <View style={styles.inputsContainer}>
                <InputV1
                placeholder="Ingrediente"
                width="100%"
                value={value.ingredient_name}
                onChangeText={ingredient_name => onChange({ ...value, ingredient_name })}
                />
                <View style={styles.row}>
                    <InputV1
                        placeholder="cantidad"
                        width="45%"
                        value={String(value.unit_quantity)}
                        onChangeText={unit_quantity => onChange({ ...value, unit_quantity: Number(unit_quantity) })}
                        keyboardType="numeric"
                    />
                    
                    <ThemedText style={styles.dash}>-</ThemedText>
                    <SelectPicker
                    width="40%"
                    placeholder="unidad"
                    value={value.unit}
                    onChange={unit => onChange({ ...value, unit })}
                    options={unitOptions}
                    />
            </View>
        </View>
    </View>
    );
}
const styles = StyleSheet.create({

container: {
    width: '100%',
    height: 96,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'right',
    backgroundColor: '#FFEDDE',
    paddingHorizontal: 20,
    borderColor: '#FFB7B7',
    borderWidth: 1,
},
inputsContainer: {
    flexDirection: 'column',
    gap: 10,
},
dash: {
    fontWeight: 'bold',
    fontSize: 20,
},
row: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'space-between',
},
subRow: {
    flexDirection: 'row',
    width: '60%',
    gap: 5
},
});

