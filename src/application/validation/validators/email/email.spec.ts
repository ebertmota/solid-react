import { EmailValidation } from '@/application/validation/validators/email/email';
import { InvalidFieldError } from '@/application/validation/errors/invalid-field';

describe('EmailValidation', () => {
  it('should return an error if email is invalid', () => {
    const sut = new EmailValidation('email');

    const error = sut.validate('');

    expect(error).toEqual(new InvalidFieldError('email'));
  });
});
