import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import Context from '@/application/contexts/form/form-context';
import { Input } from './input';

describe('Input component', () => {
  let sut: RenderResult;

  beforeEach(() => {
    sut = render(
      <Context.Provider value={{ state: {} }}>
        <Input name="input" />
      </Context.Provider>,
    );
  });

  it('should begin with readOnly', () => {
    const input = sut.getByTestId('input') as HTMLInputElement;

    expect(input.readOnly).toBe(true);
  });
  it('should disable readOnly on focus', () => {
    const input = sut.getByTestId('input') as HTMLInputElement;
    fireEvent.focus(input);

    expect(input.readOnly).toBe(false);
  });
});
