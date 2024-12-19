import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Text, useTheme, HelperText } from 'react-native-paper';
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
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const { login, loading, error } = useLogin();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleFormSubmit = async (data: LoginFormData) => {
    const isLoginSuccessful = await login(data.email, data.password);
    if (isLoginSuccessful) {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="displaySmall" style={[styles.title, { color: theme.colors.onPrimary }]}>
        Iniciar Sesión
      </Text>

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
          <>
            <TextInput
              label="Email"
              mode="flat"
              style={styles.input}
              keyboardType="email-address"
              activeOutlineColor={theme.colors.primary}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.email}
              left={<TextInput.Icon icon="email" />}
            />
            <HelperText type="error" visible={!!errors.email}>
              {errors.email?.message}
            </HelperText>
          </>
        )}
        defaultValue=""
      />

      <Controller
        control={control}
        name="password"
        rules={{ required: 'Password es requerido' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              label="Password"
              mode="flat"
              style={styles.input}
              secureTextEntry={!passwordVisible}
              activeOutlineColor={theme.colors.primary}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.password}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={passwordVisible ? 'eye-off' : 'eye'}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
            />
            <HelperText type="error" visible={!!errors.password}>
              {errors.password?.message}
            </HelperText>
          </>
        )}
        defaultValue=""
      />

      <Button
        mode="text"
        loading={loading}
        onPress={() => navigation.navigate('Register')}
        disabled={loading}
      >
        ¿No tienes una cuenta? Regístrate aquí
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

      {error && (
        <HelperText type="error" visible>
          {error}
        </HelperText>
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    zIndex: 3,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '900',
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
  },
});
