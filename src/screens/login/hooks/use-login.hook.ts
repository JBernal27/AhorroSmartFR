import { useState } from 'react';
import { AuthService } from '../../../services/auth.service';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await AuthService.login(email, password);
      return true;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Hubo un error al iniciar sesión');
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
