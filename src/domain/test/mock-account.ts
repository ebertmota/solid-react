import faker from 'faker';
import { AuthenticationCredentials } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';

export const mockAuthenticationCredentials = (): AuthenticationCredentials => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
});
