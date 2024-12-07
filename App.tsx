import React from 'react';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import {Navigation} from './src/router/navigation';
import {useColorScheme} from 'react-native';
import {themeColors} from './src/context/themes';
import {GlobalContext, GlobalProvider} from './src/context/global.context';
import Snackbar from './src/utilities/components/snackbar.utility';
import Main from './Main';
//import AsyncStorage from '@react-native-async-storage/async-storage';

function App(): React.JSX.Element {
  // const borrar = async () => {
  //   await AsyncStorage.clear();
  //   console.log('Todos los datos eliminados');
  // };

  // borrar();

  return (
    <GlobalProvider>
      <Main />
    </GlobalProvider>
  );
}

export default App;
