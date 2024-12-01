import React from 'react';
import {Image, ImageBackground} from 'react-native';
import { useTheme } from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import { styles } from './styles/login.styles';
import LoginForm from './components/login-form.component';

const LoginScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/LoginHeaderBackground.png')}
        style={styles.headerImageTop}></Image>
        <LoginForm/>
      <Image
        source={require('../../assets/LoginHeaderBackground.png')}
        style={styles.headerImageBottom}></Image>
    </SafeAreaView>
  );
};

export default LoginScreen;
