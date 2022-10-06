import { InvalidFieldError } from '@/application/validation/errors';
import { FieldValidation } from '@/application/validation/protocols';

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: object): Error {
    const value = input[this.field];
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emailIsValid = !value || emailRegex.test(value);

    return emailIsValid ? null : new InvalidFieldError('email');
  }
}
