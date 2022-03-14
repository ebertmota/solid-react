import { InvalidFieldError } from '@/application/validation/errors';
import { MinLengthValidation } from './min-length';

describe('MinLengthValidation', () => {
  it('should return error if values is invalid', () => {
    const sut = new MinLengthValidation('field', 5);

    const error = sut.validate('123');

    expect(error).toEqual(new InvalidFieldError('field'));
  });
});
