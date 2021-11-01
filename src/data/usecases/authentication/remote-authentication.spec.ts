import faker from 'faker';
import { HttpPostClient } from '../../protocols/http/http-post-client';
import { HttpPostClientSpy } from '../../test/mock-http-client';
import { RemoteAuthentication } from './remote-authentication';

describe('RemoteAuthentication', () => {
  let httpPostClientSpy: HttpPostClient & any;
  let url: string;
  let sut: RemoteAuthentication;

  beforeEach(() => {
    url = faker.internet.url();
    httpPostClientSpy = new HttpPostClientSpy();
    sut = new RemoteAuthentication(url, httpPostClientSpy);
  });

  it('should call HttpClient with correct URL', async () => {
    await sut.auth();

    expect(httpPostClientSpy.url).toBe(url);
  });
});
