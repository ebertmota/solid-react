import {
  ValidationBuilder,
  ValidationComposite,
} from '@/application/validation/validators';
import { makeSignUpValidation } from './signUp-validation';

describe('SignUpValidationFactory', () => {
  it('should make ValidationComposite with correct validations', () => {
    const sut = makeSignUpValidation();

    expect(sut).toEqual(
      new ValidationComposite([
        ...ValidationBuilder.field('name').required().min(5).build(),
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build(),
        ...ValidationBuilder.field('passwordConfirmation')
          .required()
          .sameAs('password')
          .build(),
      ]),
    );
  });
});
