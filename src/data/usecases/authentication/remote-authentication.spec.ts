import { HttpPostClient } from 'data/protocols/http/http-post-client';
import { RemoteAuthentication } from './remote-authentication';

describe('RemoteAuthentication', () => {
  let httpPostClientSpy: HttpPostClient & any;
  let sut: RemoteAuthentication;
  beforeEach(() => {
    class HttpPostClientSpy implements HttpPostClient {
      public url?: string;

      async post(url: string): Promise<void> {
        this.url = url;
        return Promise.resolve();
      }
    }
    httpPostClientSpy = new HttpPostClientSpy();
    sut = new RemoteAuthentication('any_url', httpPostClientSpy);
  });

  it('should call HttpClient with correct URL', async () => {
    await sut.auth();

    expect(httpPostClientSpy.url).toBe('any_url');
  });
});
