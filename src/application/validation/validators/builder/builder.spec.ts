import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
} from '@/application/validation/validators';
import { ValidationBuilder } from './builder';

describe('ValidationBuilder', () => {
  let sut: typeof ValidationBuilder;

  beforeAll(() => {
    sut = ValidationBuilder;
  });

  it('should return RequiredFieldValidation when required helper is used', () => {
    const field = 'any_field';
    const validations = sut.field(field).required().build();

    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });

  it('should return EmailValidation when email helper is used', () => {
    const field = 'any_field';
    const validations = sut.field(field).email().build();

    expect(validations).toEqual([new EmailValidation(field)]);
  });

  it('should return MinLengthValidation when min helper is used', () => {
    const field = 'any_field';
    const validations = sut.field(field).min(5).build();

    expect(validations).toEqual([new MinLengthValidation(field, 5)]);
  });

  it('should return a list of validations', () => {
    const field = 'any_field';
    const validations = sut.field(field).required().email().min(5).build();

    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new EmailValidation(field),
      new MinLengthValidation(field, 5),
    ]);
  });
});
