
import { View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import SlideModal from './common/SlideModal.js'; 
import { useForm, Controller} from 'react-hook-form';
import ImageSelector from './common/ImagePicker.js';
import InputV1 from './common/InputV1.js';
import ThemedSwitch from './common/ThemedSwitch.js';
import ThemedButton from './common/ThemedButton.js';
import ThemedText from './common/ThemedText.js';
import { ApiService } from '../services/ApiService.js';
import { useApiMessage } from '../hooks/useApiMessage.js';
import { useEffect, useRef} from 'react';
import InfoBox from './common/InfoBox.js';
import { getUserId } from '../hooks/useGetUserId.js';


const api = new ApiService();

export default function ModalCreateGroup({ isVisible, onClose }) {

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

    

    const { control, handleSubmit } = useForm({
        defaultValues: {
            image: 'https://i.postimg.cc/J7KRWYkV/chad.jpg',
            name: '',
            description: '', 
            isPublic: false,
        }
    });

    const onSubmit = async (data) => {
        //console.log('Datos del formulario:', data);

        data.user_id = await getUserId();

        try{
            const response = await callApiWithMessage(() => api.createGroup(data))
            if(response.success){
                console.log('Receta creada exitosamente:');
            }
        }catch(e){
            console.error('Error al enviar el formulario:', e);
        }
    }

    return (
        
        <SlideModal isVisible={isVisible} onClose={onClose} title="Crea un nuevo grupo">
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
                    render={({ field: { value, onChange } }) => (
                    <ImageSelector
                        width={'100%'}
                        height={160}
                        value={value}
                        onChange={onChange}
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
                    render={({ field: { onChange, value },fieldState: {error} }) => (
                    <>
                        <InputV1
                            label="Titulo:"
                            placeholder="Ingrese el titulo"
                            width="99%"
                            value={value}
                            onChangeText={onChange}
                        />
                        {error && <ThemedText type='subtitle1' style={{color: 'red'}}>{error.message}</ThemedText>}
                    </>
                    
                    )}
                />
        
                <Controller
                    control={control}
                    name="description"
                    rules={{ 
                        required: 'La descripcion es obligatoria',
                        maxLength: { value: 500, message: 'La descripcion no puede exceder los 500 caracteres' }
                    }}
                    render={({ field: { onChange, value }, fieldState: {error} }) => (
                    <> 
                        <InputV1
                            label="Descripcion:"
                            placeholder="Ingrese la descripcion"
                            width="99%"
                            height={100}
                            value={value}
                            onChangeText={onChange}
                            multiline={true}
                        />
                        {error && <ThemedText type='subtitle1' style={{color: 'red'}}>{error.message}</ThemedText>}
                    </>
                    
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
                            <ThemedSwitch value={value} onValueChange={onChange}/>
                        )}
                    />
                </View>
                <ThemedButton title="Guardar" onPress={handleSubmit(onSubmit)}/>
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

});