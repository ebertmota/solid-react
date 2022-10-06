import { FieldValidation } from '@/application/validation/protocols';
import { InvalidFieldError } from '@/application/validation/errors';

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {}

  validate(input: object): Error {
    const value = input[this.field];
    const isValid = !value || value.length >= this.minLength;
    return isValid ? null : new InvalidFieldError(this.field);
  }
}
