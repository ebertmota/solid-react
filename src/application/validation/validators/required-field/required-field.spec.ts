import { RequiredFieldError } from '@/application/validation/errors';
import { RequiredFieldValidation } from './required-field';

describe('RequiredFieldValidation', () => {
  it('should return an error if field is empty', () => {
    const field = 'email';
    const sut = new RequiredFieldValidation(field);

    const error = sut.validate({ [field]: '' });
    expect(error).toEqual(new RequiredFieldError());
  });

  it('should return undefined if field is not empty', () => {
    const field = 'email';
    const sut = new RequiredFieldValidation('email');

    const error = sut.validate({ [field]: 'email' });
    expect(error).toBeFalsy();
  });
});
