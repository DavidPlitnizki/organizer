import React from 'react';

export type AuthProviderProps = {
  children: React.ReactNode;
};

export type AuthProviderState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
};
