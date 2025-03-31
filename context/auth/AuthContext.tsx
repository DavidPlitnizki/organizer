import React, { createContext, useState } from 'react';
import { AuthProviderProps, AuthProviderState } from './type';

const initialState: AuthProviderState = {
  isLoggedIn: false,
  setIsLoggedIn: () => null,
};

export const AuthProviderContext =
  createContext<AuthProviderState>(initialState);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
}
