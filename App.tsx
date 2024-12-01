import React from 'react';
// import { GlobalProvider } from './src/utilities/global.context';
// import Snackbar from './src/utilities/components/snackbar.utility';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { Navigation } from './src/router/navigation';
import { useColorScheme } from 'react-native';
import { themeColors } from './src/context/themes';
//import AsyncStorage from '@react-native-async-storage/async-storage';

function App(): React.JSX.Element {
  // const borrar = async () => {
  //   await AsyncStorage.clear();
  //   console.log('Todos los datos eliminados');
  // };

  // borrar();


  const colorScheme = useColorScheme();

  const paperTheme =
    colorScheme === 'dark'
      ? { ...MD3DarkTheme, colors: { ...MD3DarkTheme.colors, ...themeColors.dark } }
      : { ...MD3LightTheme, colors:{ ...MD3LightTheme.colors, ...themeColors.light } };

  return (
    <PaperProvider theme={paperTheme}>
      <Navigation/>
      {/* <Snackbar /> */}
    </PaperProvider>
  );
}

export default App;
