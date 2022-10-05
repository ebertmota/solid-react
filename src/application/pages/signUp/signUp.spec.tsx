import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';
import { Helper } from '@/tests/helpers';
import { mock, MockProxy } from 'jest-mock-extended';
import { Validation } from '@/application/protocols';
import { SignUp } from './signUp';

type SimulateValidSubmitInput = {
  sut: RenderResult;
  name?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
};

const simulateValidSubmit = (input: SimulateValidSubmitInput): void => {
  const { sut, email, name, password, passwordConfirmation } = input;
  Helper.populateField({
    sut,
    fieldName: 'name',
    value: name,
  });
  Helper.populateField({
    sut,
    fieldName: 'email',
    value: email,
  });
  Helper.populateField({
    sut,
    fieldName: 'passwordConfirmation',
    value: passwordConfirmation || password,
  });
  Helper.populateField({
    sut,
    fieldName: 'password',
    value: password,
  });

  const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
  fireEvent.click(submitButton);
};

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
    const initialError = 'any_initial_error';
    validation.validate.mockReturnValue(initialError);

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
      value: initialError,
    });
    Helper.testStatusForField({
      sut,
      fieldName: 'email',
      value: initialError,
    });
    Helper.testStatusForField({
      sut,
      fieldName: 'password',
      value: initialError,
    });
    Helper.testStatusForField({
      sut,
      fieldName: 'passwordConfirmation',
      value: initialError,
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

  it('should show an error if passwordConfirmation Validation fails', () => {
    validation.validate.mockReturnValue(validationError);
    const sut = makeSut();

    Helper.populateField({
      sut,
      fieldName: 'passwordConfirmation',
    });

    Helper.testStatusForField({
      sut,
      fieldName: 'passwordConfirmation',
      value: validationError,
    });
  });

  it('should show valid name state if Validation succeeds', () => {
    const sut = makeSut();

    Helper.populateField({
      sut,
      fieldName: 'name',
    });

    Helper.testStatusForField({
      sut,
      fieldName: 'name',
    });
  });

  it('should show valid email state if Validation succeeds', () => {
    const sut = makeSut();

    Helper.populateField({
      sut,
      fieldName: 'email',
    });

    Helper.testStatusForField({
      sut,
      fieldName: 'email',
    });
  });

  it('should show valid password state if Validation succeeds', () => {
    const sut = makeSut();

    Helper.populateField({
      sut,
      fieldName: 'password',
    });

    Helper.testStatusForField({
      sut,
      fieldName: 'password',
    });
  });

  it('should show valid passwordConfirmation state if Validation succeeds', () => {
    const sut = makeSut();

    Helper.populateField({
      sut,
      fieldName: 'passwordConfirmation',
    });

    Helper.testStatusForField({
      sut,
      fieldName: 'passwordConfirmation',
    });
  });

  it('should enable submit button if form is valid', () => {
    const sut = makeSut();

    Helper.populateField({
      sut,
      fieldName: 'name',
    });
    Helper.populateField({
      sut,
      fieldName: 'email',
    });
    Helper.populateField({
      sut,
      fieldName: 'password',
    });
    Helper.populateField({
      sut,
      fieldName: 'passwordConfirmation',
    });

    Helper.testButtonIsDisabled({
      sut,
      fieldName: 'submit',
      isDisabled: false,
    });
  });

  it('should show loading spinner on submit', () => {
    const sut = makeSut();

    simulateValidSubmit({ sut });

    const spinner = sut.getByTestId('spinner');

    expect(spinner).toBeTruthy();
  });
});
