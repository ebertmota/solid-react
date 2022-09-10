import { AccountModel } from '@/domain/models/account-model';

export type AddAccountParams = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export interface AddAccount {
  add(credentials: AddAccountParams): Promise<AccountModel>;
}
