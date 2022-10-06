import React from 'react';
import { SignUp } from '@/application/pages';
import { makeSaveAccessToken } from '@/main/factories/data/usecases/save-access-token';
import { makeRemoteAddAccount } from '@/main/factories/data';
import { makeSignUpValidation } from './signUp-validation';

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      saveAccessToken={makeSaveAccessToken()}
    />
  );
};
