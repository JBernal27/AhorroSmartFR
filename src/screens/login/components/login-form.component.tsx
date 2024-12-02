import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Title, Text, useTheme } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { RootStackParamList } from '../../../router/navigation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import useLogin from '../hooks/use-login.hook';

interface LoginFormData {
    email: string;
    password: string;
  }

const LoginScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>();;
  const { login, loading, error } = useLogin();

  const handleFormSubmit = async (data: LoginFormData) => {
    const isLoginSuccessful = await login(data.email, data.password);
    if (isLoginSuccessful) {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Title style={[styles.title, { color: theme.colors.primary }]}>
        Iniciar Sesión
      </Title>

      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email es requerido',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Email inválido',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Email"
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
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        rules={{ required: 'Password es requerido' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Password"
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
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      <Button
        mode="text"
        loading={loading}
        onPress={() => navigation.navigate('Login')}
        disabled={loading}>
        ¿No tienes una cuenta? Registrate aquí
      </Button>

      <Button
        mode="contained"
        style={styles.button}
        loading={loading}
        onPress={handleSubmit(handleFormSubmit)}
        disabled={loading}
      >
        Iniciar Sesión
      </Button>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center', zIndex: 3 },
  title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
  input: { marginBottom: 8 },
  button: { marginTop: 16 },
  errorText: { color: 'red', marginTop: 8 },
});
