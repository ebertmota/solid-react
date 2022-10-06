import { FieldValidation } from '@/application/validation/protocols';
import { InvalidFieldError } from '@/application/validation/errors';

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string,
  ) {}

  validate(input: object): Error {
    if (input[this.field] !== input[this.fieldToCompare]) {
      return new InvalidFieldError(this.field);
    }
    return undefined;
  }
}
