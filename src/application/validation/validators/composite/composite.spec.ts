import { mock, MockProxy } from 'jest-mock-extended';
import { FieldValidation } from '@/application/validation/protocols';
import { ValidationComposite } from './composite';

describe('ValidationComposite', () => {
  let fieldValidation: MockProxy<FieldValidation>;
  let anotherFieldValidation: MockProxy<FieldValidation>;
  let field: string;
  let value: object;

  beforeAll(() => {
    field = 'any_field';
    value = { value: 'any_value' };
    fieldValidation = mock();
    fieldValidation.field = field;
    fieldValidation.validate.mockReturnValue(null);
    anotherFieldValidation = mock<FieldValidation>();
    anotherFieldValidation.field = field;
    anotherFieldValidation.validate.mockReturnValue(null);
  });

  it('should return error if any validation fails', () => {
    anotherFieldValidation.validate.mockReturnValueOnce(new Error('any_error'));
    const sut = new ValidationComposite([anotherFieldValidation]);

    const result = sut.validate(field, value);

    expect(result).toBe('any_error');
  });

  it('should return error the first error if validation fails', () => {
    anotherFieldValidation.validate.mockReturnValueOnce(
      new Error('first_error'),
    );
    fieldValidation.validate.mockReturnValueOnce(new Error('second_error'));
    const sut = new ValidationComposite([
      anotherFieldValidation,
      fieldValidation,
    ]);

    const result = sut.validate(field, value);

    expect(result).toBe('first_error');
  });

  it('should return falsy on success', () => {
    const sut = new ValidationComposite([anotherFieldValidation]);

    const result = sut.validate(field, value);

    expect(result).toBeFalsy();
  });
});
