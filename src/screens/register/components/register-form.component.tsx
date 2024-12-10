import React from 'react';
import {View} from 'react-native';
import {
  TextInput,
  Button,
  Title,
  Text,
  useTheme,
  HelperText,
} from 'react-native-paper';
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
      <Text
        variant="displaySmall"
        style={[styles.title, {color: theme.colors.onPrimary}]}>
        Regístrate
      </Text>

      <Controller
        control={control}
        name="name"
        rules={{required: 'El nombre es requerido'}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label="Nombre"
            mode="flat"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.name}
          />
        )}
      />
      {errors.name && (
        <HelperText type="error">{errors.name.message}</HelperText>
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
            mode="flat"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.email}
          />
        )}
      />
      {errors.email && (
        <HelperText type="error">{errors.email.message}</HelperText>
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
            mode="flat"
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
        <HelperText type="error">{errors.password.message}</HelperText>
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
            mode="flat"
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
        <HelperText type="error">{errors.confirmPassword.message}</HelperText>
      )}

      <Button
        mode="text"
        loading={loading}
        onPress={() => navigation.navigate('Login')}
        disabled={loading}>
        ¿Ya tienes una cuenta? Inicia sesión aquí
      </Button>

      <Button
        mode="contained"
        style={styles.button}
        loading={loading}
        onPress={handleSubmit(handleFormSubmit)}
        disabled={loading}>
        Registrarme
      </Button>

      {error && <HelperText type="error">{error}</HelperText>}
    </View>
  );
};

export default RegisterForm;
