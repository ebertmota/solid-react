import { mock } from 'jest-mock-extended';
import { FieldValidation } from '@/application/validation/protocols';
import { ValidationComposite } from './composite';

describe('ValidationComposite', () => {
  it('should return error if any validation fails', () => {
    const fieldValidation = mock<FieldValidation>();
    fieldValidation.field = 'any_field';
    const anotherFieldValidation = mock<FieldValidation>();
    anotherFieldValidation.field = 'any_field';
    anotherFieldValidation.validate.mockReturnValueOnce(new Error('any_error'));

    const sut = new ValidationComposite([anotherFieldValidation]);

    const result = sut.validate('any_field', 'any_value');

    expect(result).toBe('any_error');
  });
});
