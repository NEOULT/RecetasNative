import { View, Text, StyleSheet, TextInput } from "react-native";
import ItemTag from '../components/common/ItemTag';
import DeleteButton from '../components/common/DeleteButton';

export default function IngredientItem({ ingredient, onPress }) {

    const saludo = () =>{
        console.log('Hola');
    }

    const placeholderTextColor = "gray";

    return (
        <View style={styles.container}>
            <ItemTag
                number={1}
                position={{ position: "absolute", top: -15, left: -13 }}
            />

            <DeleteButton
                position={{ position: "absolute", right: -10 }}
                onPress={saludo}
            />

            <View style={styles.inputsContainer}>
                <TextInput
                    placeholder="Nombre del ingrediente"
                    placeholderTextColor={placeholderTextColor}                    
                    style={[styles.input, { width: "100%" }]}
                    keyboardType="default"
                    autoCapitalize="none"
                />
                <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                }}
                >
                    <View
                        style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 13,
                        width: "60%",
                        }}
                    >
                        <TextInput
                            placeholder="Cant"
                            placeholderTextColor={placeholderTextColor}
                            style={[styles.input, { flex: 1 }]}
                            keyboardType="default"
                            autoCapitalize="none"
                        />
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>-</Text>
                        <TextInput
                            placeholder="Select"
                            placeholderTextColor={placeholderTextColor}
                            style={[styles.input, { flex: 2 }]}
                            keyboardType="default"
                            autoCapitalize="none"
                        />
                    </View>

                    <TextInput
                        placeholder="Unidades"
                        placeholderTextColor={placeholderTextColor}
                        style={[styles.input, { width: "35%" }]}
                        keyboardType="default"
                        autoCapitalize="none"
                    />
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({

    container: {
        width: '90%',
        height: 96,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'right',
        backgroundColor: '#FFEDDE',
        paddingHorizontal: 20,
        borderColor: '#FFB7B7',
        borderWidth: 1,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#B3B3B3",
        height: 33,
        color: "black",
        backgroundColor:"white",
        fontSize: 16,
        paddingVertical: 3,
        paddingHorizontal: 5,
        placeholderTextColor: "green",
    },

    inputsContainer: {
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent:'space-between',
        width: '98%',
        gap: 8,
    },
});

