
import {Appbar, Avatar, IconButton, Text, useTheme} from 'react-native-paper';
import {View} from 'react-native';
import {styles} from '../styles/main-appbar.style';
import {GlobalContext} from '../../../context/global.context';
import { useContext } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../router/navigation';

const MainAppbar = () => {
  const theme = useTheme();
  const context = useContext(GlobalContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Appbar.Header
      style={[styles.header, {backgroundColor: theme.colors.primary}]}>
      <Text style={styles.userName}>
        Bienvenido{`, ${context?.settings?.name}` || ''}
      </Text>
      <IconButton
        size={25}
        icon="account-cog"
        style={{backgroundColor: theme.colors.background}}
        onPress={() => navigation.navigate('Settings')}
      />
    </Appbar.Header>
  );
};

export default MainAppbar;
