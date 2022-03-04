import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';
import { mock, MockProxy } from 'jest-mock-extended';
import { Validation } from '@/presentation/protocols';
import { Authentication } from '@/domain/usecases';
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
  let authentication: MockProxy<Authentication>;
  let sut: { render: () => RenderResult };

  beforeAll(() => {
    error = 'Validation error';
    validation = mock();
    validation.validate.mockReturnValue(null);
    authentication = mock();
    sut = {
      render: () =>
        render(
          <Login validation={validation} authentication={authentication} />,
        ),
    };
  });

  afterEach(() => {
    cleanup();
    validation.validate.mockReturnValue(undefined);
  });

  it('should start with initial state', () => {
    validation.validate.mockReturnValue(error);
    const component = sut.render();
    const errorWrap = component.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = component.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    simulateStatusForField(component, 'email', error);
    simulateStatusForField(component, 'password', error);
  });

  it('should call Validation with correct email', () => {
    const component = sut.render();
    populateEmailField(component);

    expect(validation.validate).toHaveBeenCalledWith('email', 'any_email');
  });

  it('should call Validation with correct password', () => {
    const component = sut.render();
    populatePasswordField(component);

    expect(validation.validate).toHaveBeenCalledWith(
      'password',
      'any_password',
    );
  });

  it('should show error if email Validation fails', () => {
    validation.validate.mockReturnValue(error);
    const component = sut.render();

    populateEmailField(component);

    simulateStatusForField(component, 'email', error);
  });

  it('should show error if password Validation fails', () => {
    validation.validate.mockReturnValue(error);
    const component = sut.render();

    populatePasswordField(component);

    simulateStatusForField(component, 'password', error);
  });

  it('should show valid email state if Validation succeeds', () => {
    const component = sut.render();

    populateEmailField(component);

    simulateStatusForField(component, 'email');
  });

  it('should show valid password state if Validation succeeds', () => {
    const component = sut.render();
    populatePasswordField(component);

    simulateStatusForField(component, 'password');
  });

  it('should enable submit button if form is valid', () => {
    const component = sut.render();

    populatePasswordField(component);
    populateEmailField(component);

    const submitButton = component.getByTestId('submit') as HTMLButtonElement;

    expect(submitButton.disabled).toBe(false);
  });

  it('should show loading spinner on submit', () => {
    const component = sut.render();
    simulateValidSubmit(component);

    const spinner = component.getByTestId('spinner');

    expect(spinner).toBeTruthy();
  });

  it('should call Authentication with correct params', () => {
    const component = sut.render();
    const email = 'any_email';
    const password = 'any_password';

    simulateValidSubmit(component, email, password);

    expect(authentication.auth).toHaveBeenCalledWith({
      email,
      password,
    });
  });
});
