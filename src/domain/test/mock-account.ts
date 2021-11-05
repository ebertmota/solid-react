import faker from 'faker';
import { AuthenticationCredentials } from '@/domain/usecases/authentication';
import { AccountModel } from '../models/account-model';

export const mockAuthenticationCredentials = (): AuthenticationCredentials => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
});
