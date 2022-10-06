import {
  ValidationBuilder,
  ValidationComposite,
} from '@/application/validation/validators';
import { makeLoginValidation } from './login-validation';

describe('LoginValidationFactory', () => {
  it('should make ValidationComposite with correct validations', () => {
    const sut = makeLoginValidation();

    expect(sut).toEqual(
      new ValidationComposite([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build(),
      ]),
    );
  });
});
