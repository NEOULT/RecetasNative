import { StyleSheet, Text, View , Pressable} from 'react-native';
import ImageSelector from '../../../../components/common/ImagePicker';
import ThemedText from '../../../../components/common/ThemedText';
import InputV1 from '../../../../components/common/InputV1';
import { useForm, Controller} from 'react-hook-form';
import ThemedButton from '../../../../components/common/ThemedButton';
import { getUserId } from '../../../../hooks/useGetUserId';
import { ApiService } from '../../../../services/ApiService';
import { useApiMessage } from '../../../../hooks/useApiMessage';
import InfoBox from '../../../../components/common/InfoBox';
import { use, useEffect , useState} from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import DeleteAccountModal from '../../../../components/DeleteAccountModal';



  const api = new ApiService();

export default function ConfigScreen() {

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { info, callApiWithMessage, clearInfo } = useApiMessage();

  const [userValue, setUserValue] = useState(null);

  const router = useRouter();
  
    useEffect(() => {
    async function fetchUser() {
      try {
        const userId = await getUserId();
        
        const res = await callApiWithMessage(() => api.getProfile(userId));

        setUserValue(res.data.user.user);
        
      } catch (e) {
        console.error('Error al obtener el usuario:', e);
      }
    }
    fetchUser();
  }, []);
  
  
  useEffect(() => {
    if (info.message) {
      const timeout = setTimeout(clearInfo, 3000);
      return () => clearTimeout(timeout);
    }
  }
  , [info.message, clearInfo]);


  const deleteMessage = "¿Estás seguro de que quieres eliminar tu cuenta? Perderás todos tus grupos y recetas Escribe tu nombre en MAYÚSCULAS para confirmar.";

  const handleSoftDelete = () => {
    setDeleteInput('');
    setModalVisible(true);
  };

  const confirmDelete = async () => {
    if (!userValue?.name) return;
    if (deleteInput === userValue.name.toUpperCase()) {
      setDeleteLoading(true);
      try {
        
        const response = await callApiWithMessage(() => api.softDeleteUser(userValue._id));

        if(response.success) {
          setUserValue(null);
          router.navigate('/login');
          setModalVisible(false);
        }
        
        Alert.alert("Cuenta eliminada", "Tu cuenta ha sido eliminada correctamente.");
        
      } catch (e) {
        Alert.alert("Error", "No se pudo eliminar la cuenta.");
      }
      setDeleteLoading(false);
    } else {
      Alert.alert("Error", "El nombre no coincide. Intenta de nuevo.");
    }
  };


  const onSubmit = async (data) => {

    if (data.newPassword && data.password && data.newPassword !== data.password) {
    
    clearInfo();
    callApiWithMessage(() => Promise.reject(new Error('Las contraseñas no coinciden')));
    return;
    }

    try{

      const response = await callApiWithMessage(() => api.updateProfile(userValue._id,data))

      if (response.success) console.log('Perfil actualizado correctamente');

    }catch(e){

    }


    console.log('Datos del formulario:', data);
  }

  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      profileImage: null,
      name: '',
      lastName: '',
      email: '',
      password: '',
      newPassword: ''
    }
  });

  useEffect(() => {
      if (userValue) {
        reset({
          profileImage: userValue.profileImage || null,
          name: userValue.name || '',
          lastName: userValue.lastName || '',
          email: userValue.email || '',
          password: '',
          newPassword: ''
        });
      }
    }, [userValue]);


  return (
    <View style={styles.container}>

      <Pressable style={{ position: 'absolute', right: 25, top: 20}} onPress={handleSoftDelete}>
        <Feather name="trash-2" size={30} color="black" />
      </Pressable>

      <DeleteAccountModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={confirmDelete}
        loading={deleteLoading}
        value={deleteInput}
        onChangeText={setDeleteInput}
        message={deleteMessage}
      />

      <InfoBox
        type={info.type}
        message={info.message}
        onHide={clearInfo}
        duration={2000} 
      />

      <View style={styles.column}>
        <Controller
            control={control}
            name="profileImage"
            render={({ field: { value, onChange } }) => (
            <ImageSelector
                value={value}
                style={{borderRadius: 100,  transform: [{scale: 1.3}]}}
                onChange={(newUri) => {
                  onChange(newUri);  
                }}
                uploadType="profile"
                uploadMetadata={{ userId: userValue?._id }} 
            />
            )}
        />
        <ThemedText type='subtitle3'>{userValue?.name + ' ' + userValue?.lastName}</ThemedText>
      </View>


      <View style={styles.row}> 

          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <InputV1
                label="Nombre"
                value={value}
                onChangeText={onChange}
                width="48%"
                inactive={userValue && value === userValue.name}
              />
            )}
          />

          <Controller
            control={control}
            name="lastName"
            render={({ field: { value, onChange } }) => (
              <InputV1
                label="Apellido"
                value={value}
                onChangeText={onChange}
                width="48%"
                inactive={userValue && value === userValue.lastName}
              />
            )}
          />
      </View>
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <InputV1
                label="Email"
                value={value}
                onChangeText={onChange}
                placeholder=""
                keyboardType="email-address"
                width="100%"
                inactive={userValue && value === userValue.email}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <View style={{ position: 'relative', width: '100%' }}>
                <InputV1
                  label="Contraseña anterior"
                  value={value}
                  onChangeText={onChange}
                  placeholder=""
                  secureTextEntry={!showPassword}
                  width="100%"
                  inactive={value === ''}
                />
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={22}
                  color="#888"
                  style={{ position: 'absolute', right: 15, top: 38 }}
                  onPress={() => setShowPassword((prev) => !prev)}
                />
              </View>
            )}
          />

          <Controller
            control={control}
            name="newPassword"
            render={({ field: { value, onChange } }) => (
              <View style={{ position: 'relative', width: '100%' }}>
                <InputV1
                  label="Nueva contraseña"
                  value={value}
                  onChangeText={onChange}
                  placeholder=""
                  secureTextEntry={!showNewPassword}
                  width="100%"
                  inactive={value === ''}
                />
                <Ionicons
                  name={showNewPassword ? 'eye-off' : 'eye'}
                  size={22}
                  color="#888"
                  style={{ position: 'absolute', right: 15, top: 38 }}
                  onPress={() => setShowNewPassword((prev) => !prev)}
                />
              </View>
            )}
          />

          <ThemedButton
            title="Guardar Cambios"
            onPress={handleSubmit(onSubmit)}
            style={{ marginTop: 20 }}
            disabled={!formState.isDirty}
          />
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 35,
    gap: 20,
    alignItems: 'center',
  },
  column: {
    alignItems: 'center',
    gap: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});