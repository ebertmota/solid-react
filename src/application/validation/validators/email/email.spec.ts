import { EmailValidation } from '@/application/validation/validators/email/email';
import { InvalidFieldError } from '@/application/validation/errors/invalid-field';
import faker from 'faker';

describe('EmailValidation', () => {
  it('should return an error if email is invalid', () => {
    const sut = new EmailValidation('email');

    const error = sut.validate({ email: 'any_email' });

    expect(error).toEqual(new InvalidFieldError('email'));
  });

  it('should return falsy if email is invalid', () => {
    const sut = new EmailValidation('email');

    const error = sut.validate({ email: faker.internet.email() });

    expect(error).toBeFalsy();
  });

  it('should return falsy if email is empty', () => {
    const sut = new EmailValidation('email');

    const error = sut.validate({ email: '' });

    expect(error).toBeFalsy();
  });
});
