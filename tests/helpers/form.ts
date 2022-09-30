import { fireEvent, RenderResult } from '@testing-library/react';

type FormHelper = {
  sut: RenderResult;
  fieldName: string;
};

type TestChildCountInput = FormHelper & {
  count: number;
};

export const testChildCount = (input: TestChildCountInput): void => {
  const { sut, fieldName, count } = input;
  const element = sut.getByTestId(fieldName);
  expect(element.childElementCount).toBe(count);
};

type TestButtonIsDisabledInput = FormHelper & {
  isDisabled: boolean;
};

export const testButtonIsDisabled = (
  input: TestButtonIsDisabledInput,
): void => {
  const { sut, fieldName, isDisabled } = input;
  const element = sut.getByTestId(fieldName) as HTMLButtonElement;
  expect(element.disabled).toBe(isDisabled);
};

type TestStatusForFieldInput = FormHelper & {
  value?: string;
};

export const testStatusForField = (input: TestStatusForFieldInput): void => {
  const { sut, fieldName, value } = input;
  console.log({ value });
  const fieldStatus = sut.getByTestId(`${fieldName}-status`);

  expect(fieldStatus.title).toBe(value || 'Tudo certo!');
  expect(fieldStatus.textContent).toBe(value ? '🔴' : '🟢');
};

type PopulateFieldInput = FormHelper & {
  value?: string;
};

export const populateField = (input: PopulateFieldInput): void => {
  const { sut, fieldName, value } = input;
  const field = sut.getByTestId(fieldName);
  fireEvent.input(field, { target: { value: value || 'any_value' } });
};
