import React from 'react';
import { Login } from '@/application/pages';
import { makeRemoteAuthentication } from '@/main/factories/data';
import {
  ValidationBuilder,
  ValidationComposite,
} from '@/application/validation/validators';

export const makeLogin: React.FC = () => {
  const validation = new ValidationComposite([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build(),
  ]);

  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={validation}
    />
  );
};
