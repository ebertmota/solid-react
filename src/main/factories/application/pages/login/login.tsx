import React from 'react';
import { Login } from '@/application/pages';
import { makeRemoteAuthentication } from '@/main/factories/data';
import { makeSaveAccessToken } from '@/main/factories/data/usecases/save-access-token';
import { makeLoginValidation } from './login-validation';

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      saveAccessToken={makeSaveAccessToken()}
    />
  );
};
