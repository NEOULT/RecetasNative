
import { View, StyleSheet} from 'react-native';
import SlideModal from './common/SlideModal.js'; 
import { useForm, Controller} from 'react-hook-form';
import ImageSelector from './common/ImagePicker.js';
import InputV1 from './common/InputV1.js';
import SelectPicker from './common/SelectPicker.js';
import ThemedButton from './common/ThemedButton.js';


export default function ModalCreateGroup({ isVisible, onClose }) {

    const { control, handleSubmit, } = useForm({
        defaultValues: {
            image: null,
            name: '',
            description: '',
            visibility: false,
        }
    });

    const onSubmit = (data) => {
        console.log('Datos del formulario:', data);
    }

    return (
        
        <SlideModal isVisible={isVisible} onClose={onClose} title="Crea un nuevo grupo">
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
                    name="title"
                    render={({ field: { onChange, value } }) => (
                    <InputV1
                        label="Titulo:"
                        placeholder="Ingrese el titulo"
                        width="99%"
                        value={value}
                        onChangeText={onChange}
                    />
                    )}
                />
        
                <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value } }) => (
                    <InputV1
                        label="Descripcion:"
                        placeholder="Ingrese la descripcion"
                        width="99%"
                        height={100}
                        value={value}
                        onChangeText={onChange}
                        multiline={true}
                    />
                    )}
                />

                <Controller
                    control={control}
                    name="visibility"
                    render={({ field: { onChange, value } }) => (
                        <SelectPicker
                        width="99%"
                        placeholder="Privado"
                        label="Visibilidad:"
                        value={value}
                        onChange={onChange}
                        />
                )}
                />

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

});