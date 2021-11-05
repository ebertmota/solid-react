import faker from 'faker';
import { AuthCredentials } from '@/domain/usecases/authentication';

export const mockAuthenticationCredentials = (): AuthCredentials => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
