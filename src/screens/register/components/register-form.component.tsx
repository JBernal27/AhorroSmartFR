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
  confirmPassword: string;
}

const RegisterForm = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm<RegisterFormData>();
  const {register, loading, error} = useRegister();

  const handleFormSubmit = async (data: RegisterFormData) => {
    const isRegisterSuccessful = await register(
      data.name,
      data.email,
      data.password,
    );
    if (isRegisterSuccessful) {
      navigation.navigate('Home');
    }
  };

  const password = watch('password'); // Para comparar con confirmPassword

  return (
    <View style={styles.container}>
      <Title style={[styles.title, {color: theme.colors.primary}]}>
        Regístrate
      </Title>

      <Controller
        control={control}
        name="name"
        rules={{required: 'El nombre es requerido'}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label="Nombre"
            mode="outlined"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.name}
          />
        )}
      />
      {errors.name && (
        <Text style={styles.errorText}>{errors.name.message}</Text>
      )}

      <Controller
        control={control}
        name="email"
        rules={{
          required: 'El correo es requerido',
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
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.email}
          />
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      <Controller
        control={control}
        name="password"
        rules={{
          required: 'La contraseña es requerida',
          pattern: {
            value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/,
            message:
              'La contraseña debe tener al menos 6 caracteres, una mayúscula y un carácter especial',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label="Contraseña"
            mode="outlined"
            style={styles.input}
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.password}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: 'Debes confirmar la contraseña',
          validate: value =>
            value === password || 'Las contraseñas no coinciden',
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label="Confirmar Contraseña"
            mode="outlined"
            style={styles.input}
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.confirmPassword}
          />
        )}
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
      )}

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
