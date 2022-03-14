import { mock, MockProxy } from 'jest-mock-extended';
import { FieldValidation } from '@/application/validation/protocols';
import { ValidationComposite } from './composite';

describe('ValidationComposite', () => {
  let fieldValidation: MockProxy<FieldValidation>;
  let anotherFieldValidation: MockProxy<FieldValidation>;

  beforeAll(() => {
    fieldValidation = mock();
    fieldValidation.field = 'any_field';
    anotherFieldValidation = mock<FieldValidation>();
    anotherFieldValidation.field = 'any_field';
  });

  it('should return error if any validation fails', () => {
    anotherFieldValidation.validate.mockReturnValueOnce(new Error('any_error'));
    const sut = new ValidationComposite([anotherFieldValidation]);

    const result = sut.validate('any_field', 'any_value');

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

    const result = sut.validate('any_field', 'any_value');

    expect(result).toBe('first_error');
  });
});
