import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication';
import { makeAxiosHttpClient } from '@/main/factories/infra/http/axios-http-client';

export const makeRemoteAuthentication = (): RemoteAuthentication => {
  const url = 'http://fordevs.herokuapp.com/api/login';
  return new RemoteAuthentication(url, makeAxiosHttpClient());
};
