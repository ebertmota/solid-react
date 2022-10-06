import { makeAxiosHttpClient } from '@/main/factories/infra/http/axios-http-client';
import { makeApiUrl } from '@/main/factories/infra';
import { RemoteAddAccount } from '@/data/usecases/add-account/remote-add-account';

export const makeRemoteAddAccount = (): RemoteAddAccount => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient());
};
