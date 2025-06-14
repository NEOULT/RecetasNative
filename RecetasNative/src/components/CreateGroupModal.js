import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import SlideModal from './common/SlideModal.js'; 
import { useForm, Controller } from 'react-hook-form';
import ImageSelector from './common/ImagePicker.js';
import InputV1 from './common/InputV1.js';
import ThemedSwitch from './common/ThemedSwitch.js';
import ThemedButton from './common/ThemedButton.js';
import ThemedText from './common/ThemedText.js';
import { ApiService } from '../services/ApiService.js';
import { useApiMessage } from '../hooks/useApiMessage.js';
import { useEffect, useRef } from 'react';
import InfoBox from './common/InfoBox.js';
import { getUserId } from '../hooks/useGetUserId.js';

const api = new ApiService();

export default function ModalCreateGroup({ isVisible, onClose, title = "Crear un nuevo grupo", defaultValues = null, onSuccess = null }) {

    const { info, callApiWithMessage, clearInfo } = useApiMessage(); 

    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) {
            if (info.message) {
                const timeout = setTimeout(clearInfo, 3000);
                return () => clearTimeout(timeout);
            }
        } else {
            didMount.current = true;
        }
    }, [info.message, clearInfo]);

    let groupValues = null;

    if (defaultValues) {
        groupValues = {
            image: defaultValues.image,
            name: defaultValues.name,
            description: defaultValues.description, 
            isPublic: defaultValues.isPublic,
        };
    }

    const { control, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            image: '',
            name: '',
            description: '', 
            isPublic: false,
        }
    });

    useEffect(() => {
        if (groupValues) {
            reset(groupValues);
        } else {
            reset();
        }
    }, [defaultValues]);

    // Watch values for required fields
    const watchedFields = watch(['image', 'name', 'description']);
    const isDisabled = !watchedFields[0] || !watchedFields[1] || !watchedFields[2];

    const onSubmit = async (data) => {
        data.user_id = await getUserId();
        let response = null;
        try {
            if (defaultValues) {
                response = await callApiWithMessage(() => api.updateGroup(defaultValues._id, data));
                if (response.success) {
                    console.log('Grupo actualizado exitosamente', response.data);
                    if (onSuccess) onSuccess()
                    setTimeout(() => {
                    onClose(); 
                    reset(); 
                    }, 1000);
                }
            } else {
                response = await callApiWithMessage(() => api.createGroup(data));
                if (response.success) {
                    console.log('Grupo creado exitosamente', response.data);
                    if (onSuccess) onSuccess();

                    setTimeout(() => {
                    onClose(); 
                    reset(); 
                    }, 1000);
                }
            }
        } catch (e) {
            console.error('Error al enviar el formulario:', e);
        }
    };

    return (
        <SlideModal isVisible={isVisible} onClose={onClose} title={title}>
            <InfoBox 
                message={info.message} 
                type={info.type} 
                onHide={clearInfo} 
                duration={2000} 
            />
            <View style={styles.container}>
                <Controller
                    control={control}
                    name="image"
                    rules={{required:true}}
                    render={({ field: { value, onChange } }) => (
                        <ImageSelector
                            width={'100%'}
                            height={160}
                            value={value}
                            onChange={(newUri) => {
                                onChange(newUri);  // sólo la URL
                            }}
                            uploadType="group"
                            uploadMetadata={{ gropuId: 123 }} 
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="name"
                    rules={{ 
                        required: 'El nombre es obligatorio',
                        maxLength: { value: 50, message: 'El nombre no puede exceder los 50 caracteres' }
                    }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <InputV1
                            label="Titulo:"
                            placeholder="Ingrese el titulo"
                            width="99%"
                            value={value}
                            onChangeText={onChange}
                            style = {error && styles.inputError}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="description"
                    rules={{ 
                        required: 'La descripcion es obligatoria',
                        maxLength: { value: 500, message: 'La descripcion no puede exceder los 500 caracteres' }
                    }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <InputV1
                            label="Descripcion:"
                            placeholder="Ingrese la descripcion"
                            width="99%"
                            height={100}
                            value={value}
                            onChangeText={onChange}
                            multiline={true}
                            style={error && styles.inputError}
                        />
                    )}
                />
                <View style={styles.row}>
                    <ThemedText>
                        Grupo público:
                    </ThemedText>
                    <Controller
                        control={control}
                        name="isPublic"
                        render={({ field: { onChange, value } }) => (
                            <ThemedSwitch value={value} onValueChange={onChange} />
                        )}
                    />
                </View>
                <ThemedButton title="Guardar" onPress={handleSubmit(onSubmit)} disabled={isDisabled} />
            </View>
        </SlideModal>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    inputError: {
        borderColor: 'red',
    },
});