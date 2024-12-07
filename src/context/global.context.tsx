import React, {createContext, ReactNode, useState, useEffect} from 'react';
import {SettingsService} from '../services/settings.service';
import {AxiosInstance} from '../../axios.config';
import {ISettings} from '../common/interfaces/settings.interface';

interface GlobalContextType {
  settings: ISettings | undefined;
  setSettings: (settings: ISettings) => void;
  snackbarInfo: SnackbarProps;
  setSnackbarInfo: (snackbarInfo: SnackbarProps) => void;
}

interface SnackbarProps {
  actionText?: string;
  onActionPress?: () => void;
  duration?: number;
  message: string;
  type: 'error' | 'warning' | 'info' | 'success';
  isVisible: boolean;
}

const defaultSettings: ISettings = {
  id: 0,
  isFirstTime: true,
  name: '',
  email: '',
  token: '',
  password: '',
  theme: 'system',
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const GlobalProvider = ({children}: {children: ReactNode}) => {
  const [settings, setSettings] = useState<ISettings>();
  const [snackbarInfo, setSnackbarInfo] = useState<SnackbarProps>({
    message: '',
    actionText: '',
    onActionPress: () => { snackbarInfo.isVisible = false },
    duration: 4000,
    type: 'info',
    isVisible: false,
  });

  useEffect(() => {
    const saveSettings = async () => {
      if (settings) {
        await SettingsService.saveSettings(settings);
        console.log('Settings guardados exitosamente');
        console.log(settings);
      }
    };

    saveSettings();
  }, [settings]);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const obtainedSettings = await SettingsService.getSettings();
        console.log('Settings obtenidos:', obtainedSettings);
        if (obtainedSettings) {
          setSettings(obtainedSettings as ISettings);
          if (obtainedSettings.token) {
            console.log('Token encontrado, se iniciará sesión');
            AxiosInstance.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${obtainedSettings.token}`;
            setSnackbarInfo({
              message: 'Sesion iniciada con éxito.',
              type: 'success',
              isVisible: true,
            });
          }
        } else {
          console.log('No se pudieron obtener los settings');
          setSettings(defaultSettings);
        }
      } catch (error) {
        console.log('Error al obtener los settings', error);
      }
    };

    loadSettings();
  }, []);

  return (
    <GlobalContext.Provider
      value={{settings, setSettings, snackbarInfo, setSnackbarInfo}}>
      {children}
    </GlobalContext.Provider>
  );
};

export {GlobalContext, GlobalProvider};
