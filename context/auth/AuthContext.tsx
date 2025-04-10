import React, { createContext, useState } from 'react';
import { AuthProviderProps, AuthProviderState, LoginUserType } from './type';

const initialState: AuthProviderState = {
  isLoggedInUser: null,
  setIsLoggedInUser: () => {},
};

export const AuthProviderContext =
  createContext<AuthProviderState>(initialState);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedInUser, setIsLoggedInUser] = useState<LoginUserType | null>(
    null
  );

  const value = {
    isLoggedInUser,
    setIsLoggedInUser,
  };

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
}
