import { StyleSheet, Text, View } from 'react-native';
import ImageSelector from '../../../../components/common/ImagePicker';
import ThemedText from '../../../../components/common/ThemedText';
import InputV1 from '../../../../components/common/InputV1';
import { useForm, Controller} from 'react-hook-form';
import ThemedButton from '../../../../components/common/ThemedButton';

export default function ConfigScreen() {

  const user = {
    avatar: 'https://i.postimg.cc/J7KRWYkV/chad.jpg',
    username: 'ChefJohn00',
    firstName: 'John',
    lastName: 'Doe',
    email: '',
    password: '',
  }

  const onSubmit = (data) => {
    console.log('Datos del formulario:', data);
  }

  const { control, handleSubmit, } = useForm({
    defaultValues: {
      avatar: user.avatar,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    }
  });

  return (
    <View style={styles.container}>

      {/* <View style={styles.column}>
        <ImageSelector width='90%' height={100}/>
        <ThemedText type='subtitle3'>{user.username}</ThemedText>
      </View> */}

          <Controller
            control={control}
            name="username"
            render={({ field: { value, onChange } }) => (
              <InputV1
                label="Nombre de usuario"
                value={value}
                onChangeText={onChange}
                placeholder="ChefJohn00"
                width="100%"
              />
            )}
          />

          <Controller
            control={control}
            name="firstName"
            render={({ field: { value, onChange } }) => (
              <InputV1
                label="Nombre"
                value={value}
                onChangeText={onChange}
                placeholder="John"
                width="100%"
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
                placeholder="Doe"
                width="100%"
              />
            )}
          />


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
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <InputV1
                label="Contraseña"
                value={value}
                onChangeText={onChange}
                placeholder=""
                secureTextEntry={true}
                width="100%"
              />
            )}
          />

          <ThemedButton
            title="Guardar Cambios"
            onPress={handleSubmit(onSubmit)}
            style={{ marginTop: 20 }}
          />
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  column: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
});