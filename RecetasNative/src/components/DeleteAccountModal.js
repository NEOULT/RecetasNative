import React from 'react';
import { Modal, View, Text, TextInput, Pressable, ActivityIndicator, StyleSheet } from 'react-native';

const DeleteAccountModal = ({
    visible,
    onClose,
    onConfirm,
    loading,
    value,
    onChangeText,
    message = "¿Estás seguro de que quieres eliminar tu cuenta? Escribe tu nombre en MAYÚSCULAS para confirmar.",
    placeholder = "ESCRIBE TU NOMBRE AQUÍ"
}) => (
    <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
    >
        <View style={styles.overlay}>
            <View style={styles.modalContainer}>
                <Text style={styles.title}>Eliminar cuenta</Text>
                <Text style={styles.message}>{message}</Text>
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    autoCapitalize="characters"
                    style={styles.input}
                />
                <View style={styles.buttonRow}>
                    <Pressable
                        style={[styles.button, styles.cancelButton]}
                        onPress={onClose}
                        disabled={loading}
                    >
                        <Text style={styles.cancelText}>Cancelar</Text>
                    </Pressable>
                    <Pressable
                        style={[
                            styles.button,
                            styles.deleteButton,
                            loading && styles.disabledButton
                        ]}
                        onPress={onConfirm}
                        disabled={loading}
                    >
                        {loading
                            ? <ActivityIndicator color="#fff" />
                            : <Text style={styles.deleteText}>Eliminar</Text>
                        }
                    </Pressable>
                </View>
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 12,
        width: '85%',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center'
    },
    message: {
        marginBottom: 16,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        width: '100%',
        marginBottom: 16,
        textAlign: 'center'
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center'
    },
    cancelButton: {
        marginRight: 8,
        backgroundColor: '#eee'
    },
    deleteButton: {
        marginLeft: 8,
        backgroundColor: '#e53935'
    },
    cancelText: {
        color: '#333'
    },
    deleteText: {
        color: 'white'
    },
    disabledButton: {
        opacity: 0.6
    }
});

export default DeleteAccountModal;