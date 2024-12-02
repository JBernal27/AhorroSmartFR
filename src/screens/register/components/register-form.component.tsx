import React from 'react';
import {View} from 'react-native';
import {TextInput, Button, Title, Text, useTheme} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {RootStackParamList} from '../../../router/navigation';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {styles} from '../styles/register-form.styles';
import useRegister from '../hooks/use-register.hook';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterFormData>();
  const {register, loading, error} = useRegister();

  const handleFormSubmit = async (data: RegisterFormData) => {
    const isRegisterSuccessful = await register(
      data.name,
      data.email,
      data.password,
    );
    console.log('adsas', isRegisterSuccessful);
    if (isRegisterSuccessful) {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Title style={[styles.title, {color: theme.colors.primary}]}>
        Registrate
      </Title>

      <Controller
        control={control}
        name="name"
        rules={{
          required: 'El nombre es requerido',
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label="Nombre"
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            activeOutlineColor={theme.colors.primary}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.name}
          />
        )}
        defaultValue={''}
      />
      {errors.name && (
        <Text style={styles.errorText}>{errors.name.message}</Text>
      )}

      <Controller
        control={control}
        name="email"
        rules={{
          required: 'el correo es requerido',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Email inválido',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label="Correo"
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            activeOutlineColor={theme.colors.primary}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.email}
          />
        )}
        defaultValue={''}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      <Controller
        control={control}
        name="password"
        rules={{required: 'La contraseña es requerida'}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label="Contraseña"
            mode="outlined"
            style={styles.input}
            secureTextEntry
            activeOutlineColor={theme.colors.primary}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.password}
          />
        )}
        defaultValue={''}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      <Button
        mode="text"
        loading={loading}
        onPress={() => navigation.navigate('Login')}
        disabled={loading}>
        ¿Ya tienes una cuenta? Inicia Sesión aquí
      </Button>

      <Button
        mode="contained"
        style={styles.button}
        loading={loading}
        onPress={handleSubmit(handleFormSubmit)}
        disabled={loading}>
        Registrarme
      </Button>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default RegisterForm;
