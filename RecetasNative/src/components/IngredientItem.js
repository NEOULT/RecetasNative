import { View, Text, StyleSheet, TextInput } from "react-native";
import ItemTag from '../components/common/ItemTag';
import DeleteButton from '../components/common/DeleteButton';
import InputV1 from "./common/InputV1";
import ThemedText from "./common/ThemedText";
import SelectPicker from "./common/SelectPicker";

export default function IngredientItem({ ingredient, onPress, value, onChange }) {

    const saludo = () =>{
        console.log('Hola');
    }

    return (
        <View style={styles.container}>
            <ItemTag
                number={1}
                position={{ position: "absolute", top: -15, left: -13 }}
                scale={0.9}
            />

            <DeleteButton
                position={{ position: "absolute", right: -10 }}
                onPress={saludo}
            />

            <View style={styles.inputsContainer}>
                <InputV1
                    placeholder="Ingrese el ingrediente"
                    width="100%"
                />
                <View style={styles.row}>
                    <View style={styles.subRow}>
            
                        <InputV1
                            placeholder="Cant"
                            width="40%"
                            value={value}
                            onChangeText={onChange}
                        />
                        
                        <ThemedText style={styles.dash}>-</ThemedText>
                
                        <SelectPicker
                            width="45%"
                            placeholder="kg"
                            value={value}
                            onChange={onChange}
                        />
                    </View>

                    <InputV1
                        placeholder="Unidades"
                        width="35%"
                        value={value}
                        onChangeText={onChange}
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

