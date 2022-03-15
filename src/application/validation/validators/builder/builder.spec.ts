import { RequiredFieldValidation } from '@/application/validation/validators/required-field/required-field';
import { ValidationBuilder } from './builder';

describe('ValidationBuilder', () => {
  let sut: typeof ValidationBuilder;

  beforeAll(() => {
    sut = ValidationBuilder;
  });

  it('should return RequiredFieldValidation on required call', () => {
    const field = 'any_field';
    const validations = sut.field(field).required().build();

    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });
});
