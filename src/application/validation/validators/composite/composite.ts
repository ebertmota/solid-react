/* eslint-disable no-restricted-syntax */
import { Validation } from '@/application/protocols';
import { FieldValidation } from '@/application/validation/protocols';

export class ValidationComposite implements Validation {
  constructor(private readonly validators: FieldValidation[]) {}

  validate(fieldName: string, input: object): string {
    const validators = this.validators.filter(
      validator => validator.field === fieldName,
    );

    for (const validator of validators) {
      const error = validator.validate(input);
      if (error) {
        return error.message;
      }
    }

    return undefined;
  }
}
