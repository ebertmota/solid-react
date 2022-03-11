import { FieldValidation } from '@/application/validation/protocols';
import { RequiredFieldError } from '@/application/validation/errors';

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(value: string): Error {
    return value ? undefined : new RequiredFieldError();
  }
}
