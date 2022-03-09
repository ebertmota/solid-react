import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import { mock, MockProxy } from 'jest-mock-extended';
import 'jest-localstorage-mock';
import { Validation } from '@/presentation/protocols';
import { Authentication } from '@/domain/usecases';
import { InvalidCredentialsError } from '@/domain/errors';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Login } from '..';

const populateEmailField = (
  component: RenderResult,
  email = 'any_email',
): void => {
  const emailInput = component.getByTestId('email');
  fireEvent.input(emailInput, { target: { value: email } });
};

const populatePasswordField = (
  component: RenderResult,
  password = 'any_password',
): void => {
  const passwordInput = component.getByTestId('password');
  fireEvent.input(passwordInput, { target: { value: password } });
};

const simulateValidSubmit = (
  component: RenderResult,
  email = 'any_email',
  password = 'any_password',
): void => {
  populateEmailField(component, email);
  populatePasswordField(component, password);

  const submitButton = component.getByTestId('submit') as HTMLButtonElement;
  fireEvent.click(submitButton);
};

const simulateStatusForField = (
  component: RenderResult,
  fieldName: string,
  validationError?: string,
): void => {
  const emailStatus = component.getByTestId(`${fieldName}-status`);
  expect(emailStatus.title).toBe(validationError || 'Tudo certo!');
  expect(emailStatus.textContent).toBe(validationError ? '🔴' : '🟢');
};

describe('Login component', () => {
  let error: string;
  let validation: MockProxy<Validation>;
  let accessToken: string;
  let authentication: MockProxy<Authentication>;
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
    history = createMemoryHistory();
  });

  beforeEach(() => {
    localStorage.clear();
    makeSut = () =>
      render(
        <Router location={history.location} navigator={history}>
          <Login validation={validation} authentication={authentication} />
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
    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    simulateStatusForField(sut, 'email', error);
    simulateStatusForField(sut, 'password', error);
  });

  it('should call Validation with correct email', () => {
    const sut = makeSut();
    populateEmailField(sut);

    expect(validation.validate).toHaveBeenCalledWith('email', 'any_email');
  });

  it('should call Validation with correct password', () => {
    const sut = makeSut();
    populatePasswordField(sut);

    expect(validation.validate).toHaveBeenCalledWith(
      'password',
      'any_password',
    );
  });

  it('should show error if email Validation fails', () => {
    validation.validate.mockReturnValue(error);
    const sut = makeSut();
    populateEmailField(sut);

    simulateStatusForField(sut, 'email', error);
  });

  it('should show error if password Validation fails', () => {
    validation.validate.mockReturnValue(error);
    const sut = makeSut();

    populatePasswordField(sut);

    simulateStatusForField(sut, 'password', error);
  });

  it('should show valid email state if Validation succeeds', () => {
    const sut = makeSut();

    populateEmailField(sut);

    simulateStatusForField(sut, 'email');
  });

  it('should show valid password state if Validation succeeds', () => {
    const sut = makeSut();

    populatePasswordField(sut);

    simulateStatusForField(sut, 'password');
  });

  it('should enable submit button if form is valid', () => {
    const sut = makeSut();

    populatePasswordField(sut);
    populateEmailField(sut);

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

    populateEmailField(sut);
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

    expect(errorWrap.childElementCount).toBe(1);
    expect(defaultError.textContent).toBe(authError.message);
  });

  it('should add accessToken to localStorage on success', async () => {
    const sut = makeSut();

    simulateValidSubmit(sut);
    await waitFor(() => sut.getByTestId('form'));

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'accessToken',
      accessToken,
    );
  });

  it('should redirect to SignUp page', async () => {
    const sut = makeSut();

    const signup = sut.getByTestId('signup');
    fireEvent.click(signup);

    expect(history.location.pathname).toBe('/signup');
  });
});
