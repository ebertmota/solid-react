import { AccountModel } from 'domain/models/account-model';

type AuthCredentials = {
  email: string;
  password: string;
};

export interface Authentication {
  auth(credentials: AuthCredentials): Promise<AccountModel>;
}
