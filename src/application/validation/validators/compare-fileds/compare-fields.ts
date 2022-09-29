import { FieldValidation } from '@/application/validation/protocols';
import { InvalidFieldError } from '@/application/validation/errors';

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly valueToCompare: string,
  ) {}

  validate(value: string): Error {
    if (value !== this.valueToCompare) {
      return new InvalidFieldError(this.field);
    }
    return undefined;
  }
}
