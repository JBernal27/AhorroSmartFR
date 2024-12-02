import React from 'react';
import {Image, ImageBackground} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { styles } from './styles/register.styles';
import RegisterForm from './components/register-form.component';

const RegisterScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/LoginHeaderBackground.png')}
        style={styles.headerImageTop}></Image>
        <RegisterForm/>
      <Image
        source={require('../../assets/LoginHeaderBackground.png')}
        style={styles.headerImageBottom}></Image>
    </SafeAreaView>
  );
};

export default RegisterScreen;
