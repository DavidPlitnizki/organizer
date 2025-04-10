import React from 'react';

export type LoginUserType = {
  id: string;
  name: string;
  isLogIn: boolean;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};

export type AuthProviderState = {
  isLoggedInUser: LoginUserType | null;
  setIsLoggedInUser: React.Dispatch<React.SetStateAction<LoginUserType | null>>;
};
