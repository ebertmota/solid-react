import { RenderResult } from '@testing-library/react';

type TestHelper = {
  sut: RenderResult;
  fieldName: string;
};

type TestChildCountInput = TestHelper & {
  count: number;
};

export const testChildCount = (input: TestChildCountInput): void => {
  const { sut, fieldName, count } = input;
  const element = sut.getByTestId(fieldName);
  expect(element.childElementCount).toBe(count);
};

type TestButtonIsDisabledInput = TestHelper & {
  isDisabled: boolean;
};

export const testButtonIsDisabled = (
  input: TestButtonIsDisabledInput,
): void => {
  const { sut, fieldName, isDisabled } = input;
  const element = sut.getByTestId(fieldName) as HTMLButtonElement;
  expect(element.disabled).toBe(isDisabled);
};

type TestStatusForFieldInput = TestHelper & {
  validationError?: string;
};

export const testStatusForField = (input: TestStatusForFieldInput): void => {
  const { sut, fieldName, validationError } = input;

  const fieldStatus = sut.getByTestId(`${fieldName}-status`);

  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!');
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢');
};
