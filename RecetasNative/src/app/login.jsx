import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'expo-router';
import { useContext } from 'react';
import {AuthContext} from '../context/authContext.jsx';

export default function LoginScreen() {


  const {logIn} = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();


  const onSubmit = async(data) => {
    console.log('Datos del formulario:', data);
    try {
        const response = await fetch('http://10.0.2.2:4000/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), 
        });

        const result = await response.json();

        if (!result.success) throw new Error(result.message);

        await logIn(result.data.token);

    }catch (error) {
        console.error('Error al iniciar sesion:', error);
    }
  };


  return (
    <View style={styles.screenContainer}>
      <ImageBackground
        source={{ uri: 'https://i.postimg.cc/vmWLhMxX/descarga-1.jpg' }}
        style={styles.container}
        resizeMode="cover"
        imageStyle={{ opacity: 0.7 }}
      >
        <View style={{ alignItems: 'center'}}>
            <Text style={styles.subtitle1}>Aprende</Text>
            <Text style={styles.subtitle2}>Crea</Text>
            <Text style={styles.subtitle3}>Comparte</Text>
        </View>

        <View>
          {/*----------------Email-------------------- */}
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'El correo es obligatorio',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Correo no válido',
              }
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="ejemplo@correo.com"
                placeholderTextColor={'white'}
                style={[styles.input, errors.email && styles.inputError]}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
          {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

          {/*------------------Password----------------------*/}
          <Controller
            control={control}
            name="password"
            rules={{
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 6,
                message: 'Debe tener al menos 6 caracteres'
              }
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Contraseña"
                placeholderTextColor={'white'}
                secureTextEntry
                style={[styles.input, errors.password && styles.inputError]}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

          {/*----------------- Botón---------------- */}
          <TouchableOpacity
            style={[styles.button]}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            activeOpacity={0.8}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>
              {isSubmitting ? 'Enviando...' : 'Log In'}
            </Text>
          </TouchableOpacity>

          <Link href="/register" style={styles.link}> 
            <Text style={{ color: 'white' }}>¿No tienes cuenta? Regístrate</Text>
          </Link>
        </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#363849',
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 100,
  },
  subtitle1: {
    fontSize: 40,
    color: 'white',
  },
  subtitle2: {
    fontSize: 40,
    color: '#4CCFFF',
  },
  subtitle3:{
    fontSize: 40,
    color: '#F2B059',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "rgba(0,0,0,0.5)",
    padding: 10,
    marginBottom: 10,
    width: 250,
    height: 50,
    color: "white",
    backgroundColor:"rgba(0,0,0,0.5)",
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red'
  },
  error: {
    color: 'red',
    marginBottom: 10
  },
  link: {
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor:'rgba(255, 255, 255, 0.5)',
    alignItems: 'center', 
    padding: 12, 
    borderRadius: 6, 
    marginTop: 10
  },
});