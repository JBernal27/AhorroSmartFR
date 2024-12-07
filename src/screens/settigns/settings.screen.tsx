import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Text,
  Button,
  useTheme,
  Appbar,
} from 'react-native-paper';
import { RootStackParamList } from '../../router/navigation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import SettingsForm from './components/settings-form.component';
import { AuthService } from '../../services/auth.service';
import ModalComponent from '../../utilities/components/modal.utility';

const SettingsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    AuthService.clearSession();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }], // Reinicia la navegación para que no pueda volver atrás
    });
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
        <Appbar.BackAction color='white' onPress={() => navigation.goBack()} />
        <Appbar.Content color='white' title="Configuración" />
        <Appbar.Action color='white' icon="logout" onPress={() => setModalVisible(true)} />
      </Appbar.Header>

      <View style={styles.formContainer}>
        <SettingsForm />
      </View>

      {/* Modal de confirmación para logout */}
      <ModalComponent
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        title="Cerrar Sesión"
        content="¿Estás seguro de que deseas cerrar sesión?"
        buttons={[
          {
            label: 'Cerrar Sesión',
            onPress: () => {
              setModalVisible(false);
              handleLogout();
            },
            color: 'error',
          },
          {
            label: 'Cancelar',
            onPress: () => setModalVisible(false),
            color: 'success',
          },
        ]}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
  },
  container: {
    flexGrow: 1,
  },
});

export default SettingsScreen;
