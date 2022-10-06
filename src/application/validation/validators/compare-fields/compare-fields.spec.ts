import { InvalidFieldError } from '@/application/validation/errors';
import { CompareFieldsValidation } from './compare-fields';

describe('CompareFieldsValidation', () => {
  let field: string;
  let value: string;
  let fieldToCompare: string;
  let sut: CompareFieldsValidation;

  beforeAll(() => {
    field = 'any_field';
    value = 'any_value';
    fieldToCompare = 'field_to_compare';
  });

  beforeEach(() => {
    sut = new CompareFieldsValidation(field, fieldToCompare);
  });

  it('should return InvalidFieldError if compare is invalid', () => {
    const result = sut.validate({
      [field]: value,
      [fieldToCompare]: 'different_value',
    });

    expect(result).toEqual(new InvalidFieldError(field));
  });

  it('should not return error if compare is valid', () => {
    const thisSut = new CompareFieldsValidation(field, fieldToCompare);
    const result = thisSut.validate({
      [field]: value,
      [fieldToCompare]: value,
    });

    expect(result).toBeFalsy();
  });
});
