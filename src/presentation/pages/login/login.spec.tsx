import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';
import { mock, MockProxy } from 'jest-mock-extended';
import { Validation } from '@/presentation/protocols';
import { Login } from '..';

describe('Login component', () => {
  let error: string;
  let validation: MockProxy<Validation>;
  let sut: { render: () => RenderResult };

  beforeAll(() => {
    error = 'Validation error';
    validation = mock();
    validation.validate.mockReturnValue(null);
    sut = {
      render: () => render(<Login validation={validation} />),
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

    const emailStatus = component.getByTestId('email-status');
    expect(emailStatus.title).toBe(error);
    expect(emailStatus.textContent).toBe('🔴');

    const passwordStatus = component.getByTestId('password-status');
    expect(passwordStatus.title).toBe(error);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  it('should call Validation with correct email', () => {
    const component = sut.render();
    const emailInput = component.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: 'any_email' } });

    expect(validation.validate).toHaveBeenCalledWith('email', 'any_email');
  });

  it('should call Validation with correct password', () => {
    const component = sut.render();
    const passwordInput = component.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: 'any_password' } });

    expect(validation.validate).toHaveBeenCalledWith(
      'password',
      'any_password',
    );
  });

  it('should show error if email Validation fails', () => {
    validation.validate.mockReturnValue(error);
    const component = sut.render();

    const emailInput = component.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: 'any_email' } });

    const emailStatus = component.getByTestId('email-status');

    expect(emailStatus.title).toBe(error);
    expect(emailStatus.textContent).toBe('🔴');
  });

  it('should show error if password Validation fails', () => {
    validation.validate.mockReturnValue(error);
    const component = sut.render();

    const passwordInput = component.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: 'any_password' } });

    const passwordStatus = component.getByTestId('password-status');

    expect(passwordStatus.title).toBe(error);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  it('should show valid email state if Validation succeeds', () => {
    const component = sut.render();

    const emailInput = component.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: 'any_email' } });

    const emailStatus = component.getByTestId('email-status');

    expect(emailStatus.title).toBe('Tudo certo!');
    expect(emailStatus.textContent).toBe('🟢');
  });

  it('should show valid password state if Validation succeeds', () => {
    const component = sut.render();
    const passwordInput = component.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: 'any_password' } });

    const passwordStatus = component.getByTestId('password-status');

    expect(passwordStatus.title).toBe('Tudo certo!');
    expect(passwordStatus.textContent).toBe('🟢');
  });

  it('should enable submit button if form is valid', () => {
    const component = sut.render();

    const passwordInput = component.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: 'any_password' } });

    const emailInput = component.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: 'any_email' } });

    const submitButton = component.getByTestId('submit') as HTMLButtonElement;

    expect(submitButton.disabled).toBe(false);
  });
});
