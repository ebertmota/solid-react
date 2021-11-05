import { AuthCredentials } from 'domain/usecases/authentication';
import faker from 'faker';

export const mockAuthenticationCredentials = (): AuthCredentials => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
