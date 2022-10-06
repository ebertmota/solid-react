import { InvalidFieldError } from '@/application/validation/errors';
import { MinLengthValidation } from './min-length';

describe('MinLengthValidation', () => {
  it('should return error if values have less than provided characters', () => {
    const sut = new MinLengthValidation('field', 5);

    const error = sut.validate({ field: '123' });

    expect(error).toEqual(new InvalidFieldError('field'));
  });

  it('should return falsy if values have provided characters', () => {
    const sut = new MinLengthValidation('field', 5);

    const error = sut.validate({ field: '12345' });

    expect(error).toBeFalsy();
  });

  it('should return falsy if values have more than provided characters', () => {
    const sut = new MinLengthValidation('field', 5);

    const error = sut.validate({ field: '12345678910' });

    expect(error).toBeFalsy();
  });

  it('should return null if field not exists in validation input', () => {
    const sut = new MinLengthValidation('field', 5);
    const error = sut.validate({});
    expect(error).toBeFalsy();
  });
});
