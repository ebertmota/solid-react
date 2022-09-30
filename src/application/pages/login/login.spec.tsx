import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import { mock, MockProxy } from 'jest-mock-extended';
import { Validation } from '@/application/protocols';
import { Authentication, SaveAccessToken } from '@/domain/usecases';
import { InvalidCredentialsError } from '@/domain/errors';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Helper } from '@/tests/helpers';
import { Login } from '..';

const simulateValidSubmit = (
  component: RenderResult,
  email = 'any_email',
  password = 'any_password',
): void => {
  Helper.populateField({
    sut: component,
    fieldName: 'email',
    value: email,
  });
  Helper.populateField({
    sut: component,
    fieldName: 'password',
    value: password,
  });

  const submitButton = component.getByTestId('submit') as HTMLButtonElement;
  fireEvent.click(submitButton);
};

describe('Login component', () => {
  let error: string;
  let validation: MockProxy<Validation>;
  let accessToken: string;
  let authentication: MockProxy<Authentication>;
  let saveAccessToken: MockProxy<SaveAccessToken>;
  let history: MemoryHistory;
  let makeSut: () => RenderResult;

  beforeAll(() => {
    error = 'Validation error';
    accessToken = 'any_access_token';
    validation = mock();
    validation.validate.mockReturnValue(null);
    authentication = mock();
    authentication.auth.mockResolvedValue({
      accessToken,
    });
    saveAccessToken = mock();
    history = createMemoryHistory({
      initialEntries: ['/login'],
    });
  });

  beforeEach(() => {
    makeSut = () =>
      render(
        <Router location={history.location} navigator={history}>
          <Login
            validation={validation}
            authentication={authentication}
            saveAccessToken={saveAccessToken}
          />
        </Router>,
      );
  });

  afterEach(() => {
    cleanup();
    validation.validate.mockReturnValue(undefined);
  });

  it('should start with initial state', () => {
    validation.validate.mockReturnValue(error);
    const sut = makeSut();
    Helper.testChildCount({
      sut,
      fieldName: 'error-wrap',
      count: 0,
    });

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    Helper.testStatusForField({
      sut,
      fieldName: 'email',
      value: error,
    });
    Helper.testStatusForField({
      sut,
      fieldName: 'password',
      value: error,
    });
  });

  it('should call Validation with correct email', () => {
    const sut = makeSut();
    Helper.populateField({
      sut,
      fieldName: 'email',
      value: 'any_email',
    });

    expect(validation.validate).toHaveBeenCalledWith('email', 'any_email');
  });

  it('should call Validation with correct password', () => {
    const sut = makeSut();

    Helper.populateField({
      sut,
      fieldName: 'password',
      value: 'any_password',
    });

    expect(validation.validate).toHaveBeenCalledWith(
      'password',
      'any_password',
    );
  });

  it('should show error if email Validation fails', () => {
    validation.validate.mockReturnValue(error);
    const sut = makeSut();
    Helper.populateField({
      sut,
      fieldName: 'email',
    });

    Helper.testStatusForField({
      sut,
      fieldName: 'email',
      value: error,
    });
  });

  it('should show error if password Validation fails', () => {
    validation.validate.mockReturnValue(error);
    const sut = makeSut();

    Helper.populateField({
      sut,
      fieldName: 'password',
    });

    Helper.testStatusForField({
      sut,
      fieldName: 'password',
      value: error,
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

  it('should enable submit button if form is valid', () => {
    const sut = makeSut();

    Helper.populateField({
      sut,
      fieldName: 'password',
    });
    Helper.populateField({
      sut,
      fieldName: 'email',
    });

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;

    expect(submitButton.disabled).toBe(false);
  });

  it('should show loading spinner on submit', () => {
    const sut = makeSut();

    simulateValidSubmit(sut);

    const spinner = sut.getByTestId('spinner');

    expect(spinner).toBeTruthy();
  });

  it('should call Authentication with correct params', () => {
    const sut = makeSut();

    const email = 'any_email';
    const password = 'any_password';

    simulateValidSubmit(sut, email, password);

    expect(authentication.auth).toHaveBeenCalledWith({
      email,
      password,
    });
  });

  it('should call Authentication only once', () => {
    const sut = makeSut();

    simulateValidSubmit(sut);
    simulateValidSubmit(sut);

    expect(authentication.auth).toHaveBeenCalledTimes(1);
  });

  it('should not call Authentication if form is invalid', () => {
    validation.validate.mockReturnValue(error);
    const sut = makeSut();

    Helper.populateField({
      sut,
      fieldName: 'email',
    });
    fireEvent.submit(sut.getByTestId('form'));

    expect(authentication.auth).toHaveBeenCalledTimes(0);
  });

  it('should present error if Authentication fails', async () => {
    const authError = new InvalidCredentialsError();
    authentication.auth.mockRejectedValueOnce(authError);
    const sut = makeSut();

    simulateValidSubmit(sut);
    const errorWrap = sut.getByTestId('error-wrap');
    await waitFor(() => errorWrap);
    const defaultError = sut.getByTestId('default-error');

    Helper.testChildCount({
      sut,
      fieldName: 'error-wrap',
      count: 1,
    });
    expect(defaultError.textContent).toBe(authError.message);
  });

  it('should call SaveAccessToken on success', async () => {
    const sut = makeSut();

    simulateValidSubmit(sut);
    await waitFor(() => sut.getByTestId('form'));

    expect(saveAccessToken.save).toHaveBeenCalledWith({
      accessToken,
    });
    expect(history.location.pathname).toBe('/');
  });

  it('should present error if SaveAccessToken fails', async () => {
    const saveAccessTokenError = new Error('saveAccessToken fails');
    saveAccessToken.save.mockImplementationOnce(() => {
      throw saveAccessTokenError;
    });
    const sut = makeSut();

    simulateValidSubmit(sut);
    const errorWrap = sut.getByTestId('error-wrap');
    await waitFor(() => errorWrap);
    const defaultError = sut.getByTestId('default-error');

    Helper.testChildCount({
      sut,
      fieldName: 'error-wrap',
      count: 1,
    });
    expect(defaultError.textContent).toBe(saveAccessTokenError.message);
  });

  it('should redirect to SignUp page', async () => {
    const sut = makeSut();

    const signup = sut.getByTestId('signup');
    fireEvent.click(signup);
    expect(history.location.pathname).toBe('/signup');
  });
});
