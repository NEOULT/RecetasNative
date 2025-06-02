import { View, Image, StyleSheet, TouchableOpacity, Alert, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useImagePicker } from "../../hooks/useImagePicker";
import { useEffect, useState } from "react";

export default function ImageSelector({width = 100, height = 100, value, onChange}) {
    const { imageUri, setImageUri, pickImage, takePhoto } = useImagePicker();
    const [image, setImage] = useState(value || null);

    useEffect(() => {
        if(imageUri) {
            value = imageUri;
            onChange(value);
        }
        value = null;
    }, [imageUri]);

    const handlePress = () => {
        if (imageUri) {
        Alert.alert("Imagen seleccionada", "¿Qué deseas hacer?", [
            { text: "Eliminar", onPress: () => setImageUri(null), style: "destructive" },
            { text: "Cambiar imagen", onPress: showPickerOptions },
            { text: "Cancelar", style: "cancel" },
        ]);
        } else {
        showPickerOptions();
        }
    };

    const showPickerOptions = () => {
        Alert.alert("Seleccionar imagen", "¿Qué deseas hacer?", [
        { text: "Cancelar", style: "cancel" },
        { text: "Cámara", onPress: takePhoto },
        { text: "Galería", onPress: pickImage },
        ]);
    };

    return (
        <TouchableOpacity style={[styles.square, {width, height}]} onPress={handlePress}>
        {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
            <View style={styles.placeholder}>
            <MaterialIcons name="photo-camera" size={40} color="#999" />
            <Text style={{ color: "#999", marginTop: 5 }}>Agregar foto</Text>
            </View>
        )}
        </TouchableOpacity>
    );
    }

const styles = StyleSheet.create({
    square: {
        backgroundColor: "#eee",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        overflow: "hidden",
    },
    placeholder: {
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%",
    },
});
