import faker from 'faker';
import { mockAuthenticationCredentials } from '@/domain/test/mock-authentication';
import { HttpPostClientSpy } from '../../test/mock-http-client';
import { RemoteAuthentication } from './remote-authentication';

describe('RemoteAuthentication', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let httpPostClientSpy: any;
  let url: string;
  let sut: RemoteAuthentication;

  beforeEach(() => {
    url = faker.internet.url();
    httpPostClientSpy = new HttpPostClientSpy();
    sut = new RemoteAuthentication(url, httpPostClientSpy);
  });

  it('should call HttpPostClient with correct URL', async () => {
    await sut.auth(mockAuthenticationCredentials());

    expect(httpPostClientSpy.url).toBe(url);
  });

  it('should call HttpPostClient with correct body', async () => {
    const credentials = mockAuthenticationCredentials();
    await sut.auth(credentials);

    expect(httpPostClientSpy.body).toEqual(credentials);
  });
});
