import {
  RequiredFieldValidation,
  EmailValidation,
} from '@/application/validation/validators';
import { ValidationBuilder } from './builder';

describe('ValidationBuilder', () => {
  let sut: typeof ValidationBuilder;

  beforeAll(() => {
    sut = ValidationBuilder;
  });

  it('should return RequiredFieldValidation when required is used', () => {
    const field = 'any_field';
    const validations = sut.field(field).required().build();

    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });

  it('should return EmailValidation when email is used', () => {
    const field = 'any_field';
    const validations = sut.field(field).email().build();

    expect(validations).toEqual([new EmailValidation(field)]);
  });
});
