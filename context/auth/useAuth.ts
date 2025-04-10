import { useContext } from 'react';
import { AuthProviderContext } from './AuthContext';

export const useAuth = () => {
  const context = useContext(AuthProviderContext);

  if (context === undefined)
    throw new Error('useAuthContext must be used within a AuthProvider');

  return context;
};
