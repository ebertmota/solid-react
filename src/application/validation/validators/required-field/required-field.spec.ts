import { RequiredFieldError } from '@/application/validation/errors';
import { RequiredFieldValidation } from './required-field';

describe('RequiredFieldValidation', () => {
  it('should return an error if field is empty', () => {
    const sut = new RequiredFieldValidation('email');

    const error = sut.validate('');
    expect(error).toEqual(new RequiredFieldError());
  });

  it('should return undefined if field is not empty', () => {
    const sut = new RequiredFieldValidation('email');

    const error = sut.validate('any_email');
    expect(error).toBeFalsy();
  });
});
