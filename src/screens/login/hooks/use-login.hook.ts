import {useContext, useState} from 'react';
import {AuthService} from '../../../services/auth.service';
import {GlobalContext} from '../../../context/global.context';
import axios from 'axios';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const context = useContext(GlobalContext);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const isLoginSuccessful = await AuthService.login(email, password);
      if (isLoginSuccessful) {
        console.log('Is login successful:', isLoginSuccessful);
        context?.setSettings({...isLoginSuccessful, theme: 'system'});
        context?.setSnackbarInfo({
          message: 'Inicio de sesión exitoso.',
          type: 'success',
          isVisible: true,
        });
      }
      return true;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError('Credenciales incorrectas. Por favor, intenta de nuevo.');
          context?.setSnackbarInfo({
            message:
              'Verifique sus credenciales o registrate para iniciar sesión.',
            type: 'error',
            isVisible: true,
          });
        } else {
          setError(err.response?.data?.message || 'Error al iniciar sesión');
          context?.setSnackbarInfo({
            message:
              'Hubo un error al iniciar, intente de nuevo, si persiste, contacte al administrador.',
            type: 'error',
            isVisible: true,
          });
        }
      } else {
        setError('Unknown error occurred during login');
      }
    } finally {
      setLoading(false);
    }
    return false;
  };

  return {
    loading,
    error,
    login,
  };
};

export default useLogin;
