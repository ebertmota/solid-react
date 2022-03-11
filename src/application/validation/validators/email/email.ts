import { InvalidFieldError } from '@/application/validation/errors';
import { FieldValidation } from '@/application/validation/protocols';

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(value: string): Error {
    return new InvalidFieldError('email');
  }
}
