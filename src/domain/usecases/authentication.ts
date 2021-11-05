import { AccountModel } from '@/domain/models/account-model';

export type AuthenticationCredentials = {
  email: string;
  password: string;
};

export interface Authentication {
  auth(credentials: AuthenticationCredentials): Promise<AccountModel>;
}
