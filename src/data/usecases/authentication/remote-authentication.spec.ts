import { HttpPostClient } from '../../protocols/http/http-post-client';
import { HttpPostClientSpy } from '../../test/mock-http-client';
import { RemoteAuthentication } from './remote-authentication';

describe('RemoteAuthentication', () => {
  let httpPostClientSpy: HttpPostClient & any;
  let sut: RemoteAuthentication;
  beforeEach(() => {
    httpPostClientSpy = new HttpPostClientSpy();
    sut = new RemoteAuthentication('any_url', httpPostClientSpy);
  });

  it('should call HttpClient with correct URL', async () => {
    await sut.auth();

    expect(httpPostClientSpy.url).toBe('any_url');
  });
});
