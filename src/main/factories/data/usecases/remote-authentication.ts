import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication';
import { makeAxiosHttpClient } from '@/main/factories/infra/http/axios-http-client';
import { makeApiUrl } from '@/main/factories/infra';

export const makeRemoteAuthentication = (): RemoteAuthentication => {
  return new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient());
};
