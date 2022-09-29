import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Helper } from '@/tests/helpers';
import { SignUp } from './signUp';

describe('SignUp component', () => {
  let makeSut: () => RenderResult;

  beforeEach(() => {
    makeSut = () => render(<SignUp />);
  });

  it('should start with initial state', () => {
    const sut = makeSut();

    const validationError = 'Campo obrigatório';
    Helper.testChildCount({
      sut,
      fieldName: 'error-wrap',
      count: 0,
    });
    Helper.testButtonIsDisabled({
      sut,
      fieldName: 'submit',
      isDisabled: true,
    });
    Helper.testStatusForField({
      sut,
      fieldName: 'name',
      validationError,
    });
    Helper.testStatusForField({
      sut,
      fieldName: 'email',
      validationError,
    });
    Helper.testStatusForField({
      sut,
      fieldName: 'password',
      validationError,
    });
    Helper.testStatusForField({
      sut,
      fieldName: 'passwordConfirmation',
      validationError,
    });
  });
});
