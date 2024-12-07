import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  TextInput,
  Button,
  useTheme,
  Text,
  RadioButton,
} from 'react-native-paper';
import {Controller} from 'react-hook-form';
import {ISettings} from '../../../common/interfaces/settings.interface';
import useSettingsForm from '../hooks/use-settings-form.component';

const initialSettings: ISettings = {
  id: 0,
  name: '',
  email: '',
  isFirstTime: false,
  token: 'abc123token',
  theme: 'system',
};

const SettingsForm = () => {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    isEditing,
    setIsEditing,
    isLoading,
    onSubmit,
    handleCancel,
  } = useSettingsForm(initialSettings);

  return (
    <View>
      <Controller
        control={control}
        name="name"
        render={({field: {onChange, value}}) => (
          <TextInput
            label="Nombre"
            value={value}
            readOnly={!isEditing}
            disabled={isLoading}
            style={styles.input}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({field: {onChange, value}}) => (
          <TextInput
            label="Email"
            value={value}
            readOnly={!isEditing}
            disabled={isLoading}
            style={styles.input}
            onChangeText={onChange}
          />
        )}
      />

      <View style={styles.radioGroup}>
        <Text style={{color: theme.colors.primary, marginBottom: 8}}>
          Selecciona el tema:
        </Text>
        <Controller
          control={control}
          name="theme"
          render={({field: {onChange, value}}) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              <View style={styles.radioOption}>
                <RadioButton value="light" disabled={!isEditing || isLoading} />
                <Text style={styles.radioLabel}>Claro</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="dark" disabled={!isEditing || isLoading} />
                <Text style={styles.radioLabel}>Oscuro</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton
                  value="system"
                  disabled={!isEditing || isLoading}
                />
                <Text style={styles.radioLabel}>Por defecto</Text>
              </View>
            </RadioButton.Group>
          )}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          textColor={theme.colors.background}
          loading={isLoading}
          disabled={isLoading}
          onPress={
            isEditing ? handleSubmit(onSubmit) : () => setIsEditing(true)
          }>
          {isEditing ? 'Guardar' : 'Editar'}
        </Button>
        {isEditing && (
          <Button mode="outlined" onPress={handleCancel}>
            Cancelar
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
  },
  radioGroup: {
    marginBottom: 24,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  buttonContainer: {
    gap: 16,
    marginTop: 24,
  },
});

export default SettingsForm;
