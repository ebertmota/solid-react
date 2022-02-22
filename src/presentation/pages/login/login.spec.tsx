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
  let validation: MockProxy<Validation>;
  let sut: RenderResult;

  beforeAll(() => {
    validation = mock();
    validation.validate.mockReturnValue('');
  });

  beforeEach(() => {
    sut = render(<Login validation={validation} />);
  });

  afterEach(cleanup);

  it('should start with initial state', () => {
    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('Campo obrigatório');
    expect(emailStatus.textContent).toBe('🔴');

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Campo obrigatório');
    expect(passwordStatus.textContent).toBe('🔴');
  });

  it('should call Validation with correct email', () => {
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: 'any_email' } });

    expect(validation.validate).toHaveBeenCalledWith({
      email: 'any_email',
    });
  });
});
