import { InvalidFieldError } from '@/application/validation/errors';
import { CompareFieldsValidation } from './compare-fields';

describe('CompareFieldsValidation', () => {
  let field: string;
  let value: string;
  let valueToCompare: string;
  let sut: CompareFieldsValidation;

  beforeAll(() => {
    field = 'any_field';
    value = 'any_value';
    valueToCompare = 'value_to_compare';
  });

  beforeEach(() => {
    sut = new CompareFieldsValidation(field, valueToCompare);
  });

  it('should return InvalidFieldError if compare is invalid', () => {
    const result = sut.validate(value);

    expect(result).toEqual(new InvalidFieldError(field));
  });

  it('should not return error if compare is valid', () => {
    const thisSut = new CompareFieldsValidation(field, value);
    const result = thisSut.validate(value);

    expect(result).toBeFalsy();
  });
});
