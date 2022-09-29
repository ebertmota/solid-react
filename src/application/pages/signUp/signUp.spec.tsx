import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import {
  testButtonIsDisabled,
  testChildCount,
  testStatusForField,
} from '@/tests/helpers';
import { SignUp } from './signUp';

describe('SignUp component', () => {
  let makeSut: () => RenderResult;

  beforeEach(() => {
    makeSut = () => render(<SignUp />);
  });

  it('should start with initial state', () => {
    const sut = makeSut();

    const validationError = 'Campo obrigatório';
    testChildCount({
      sut,
      fieldName: 'error-wrap',
      count: 0,
    });
    testButtonIsDisabled({
      sut,
      fieldName: 'submit',
      isDisabled: true,
    });
    testStatusForField({
      sut,
      fieldName: 'name',
      validationError,
    });
    testStatusForField({
      sut,
      fieldName: 'email',
      validationError,
    });
    testStatusForField({
      sut,
      fieldName: 'password',
      validationError,
    });
    testStatusForField({
      sut,
      fieldName: 'passwordConfirmation',
      validationError,
    });
  });
});
