import {useContext} from 'react';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import {Navigation} from './src/router/navigation';
import Snackbar from './src/utilities/components/snackbar.utility';
import {themeColors} from './src/context/themes';
import {useColorScheme} from 'react-native';
import {GlobalContext} from './src/context/global.context';

const Main = () => {
  const context = useContext(GlobalContext);
  const colorScheme = useColorScheme();

  const paperTheme = (() => {
    if (context?.settings?.theme === 'system') {
      return colorScheme === 'dark'
        ? {
            ...MD3DarkTheme,
            colors: {...MD3DarkTheme.colors, ...themeColors.dark},
          }
        : {
            ...MD3LightTheme,
            colors: {...MD3LightTheme.colors, ...themeColors.light},
          };
    } else {
      return context?.settings?.theme === 'dark'
        ? {
            ...MD3DarkTheme,
            colors: {...MD3DarkTheme.colors, ...themeColors.dark},
          }
        : {
            ...MD3LightTheme,
            colors: {...MD3LightTheme.colors, ...themeColors.light},
          };
    }
  })();

  return (
    <PaperProvider theme={paperTheme}>
      <Navigation />
      <Snackbar />
    </PaperProvider>
  );
};

export default Main;
