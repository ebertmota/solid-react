import { EmailValidation } from '@/application/validation/validators/email/email';
import { InvalidFieldError } from '@/application/validation/errors/invalid-field';
import faker from 'faker';

describe('EmailValidation', () => {
  it('should return an error if email is invalid', () => {
    const sut = new EmailValidation('email');

    const error = sut.validate('any_email');

    expect(error).toEqual(new InvalidFieldError('email'));
  });

  it('should return falsy if email is invalid', () => {
    const sut = new EmailValidation('email');

    const error = sut.validate(faker.internet.email());

    expect(error).toBeFalsy();
  });
});
