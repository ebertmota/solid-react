import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import { Helper } from '@/tests/helpers';
import { mock, MockProxy } from 'jest-mock-extended';
import { Validation } from '@/application/protocols';
import { SignUp } from './signUp';

describe('SignUp component', () => {
  let validationError: string;
  let validation: MockProxy<Validation>;
  let makeSut: () => RenderResult;

  beforeAll(() => {
    validationError = 'Validation error';
    validation = mock();
    validation.validate.mockReturnValue(null);
  });

  beforeEach(() => {
    makeSut = () => render(<SignUp validation={validation} />);
  });

  afterEach(() => {
    cleanup();
    validation.validate.mockReturnValue(null);
  });

  it('should start with initial state', () => {
    const sut = makeSut();

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
      value: '',
    });
    Helper.testStatusForField({
      sut,
      fieldName: 'email',
      value: '',
    });
    Helper.testStatusForField({
      sut,
      fieldName: 'password',
      value: '',
    });
    Helper.testStatusForField({
      sut,
      fieldName: 'passwordConfirmation',
      value: 'Campo obrigatório',
    });
  });

  it('should show an error if name Validation fails', () => {
    validation.validate.mockReturnValue(validationError);
    const sut = makeSut();

    Helper.populateField({
      sut,
      fieldName: 'name',
    });

    Helper.testStatusForField({
      sut,
      fieldName: 'name',
      value: validationError,
    });
  });

  it('should show an error if email Validation fails', () => {
    validation.validate.mockReturnValue(validationError);
    const sut = makeSut();

    Helper.populateField({
      sut,
      fieldName: 'email',
    });

    Helper.testStatusForField({
      sut,
      fieldName: 'email',
      value: validationError,
    });
  });

  it('should show an error if password Validation fails', () => {
    validation.validate.mockReturnValue(validationError);
    const sut = makeSut();

    Helper.populateField({
      sut,
      fieldName: 'password',
    });

    Helper.testStatusForField({
      sut,
      fieldName: 'password',
      value: validationError,
    });
  });
});
