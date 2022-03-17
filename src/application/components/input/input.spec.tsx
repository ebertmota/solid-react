import React from 'react';
import { render, RenderResult } from '@testing-library/react';
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
});
