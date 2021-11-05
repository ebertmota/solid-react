import faker from 'faker';
import { mockAuthenticationCredentials } from '@/domain/test/mock-authentication';
import { HttpPostClientSpy } from '../../test/mock-http-client';
import { RemoteAuthentication } from './remote-authentication';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { AuthenticationCredentials } from '@/domain/usecases/authentication';
import { AccountModel } from '@/domain/models/account-model';

describe('RemoteAuthentication', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let httpPostClientSpy: HttpPostClientSpy<
    AuthenticationCredentials,
    AccountModel
  >;
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

  it('should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };

    const promise = sut.auth(mockAuthenticationCredentials());

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  it('should throw UnexpectedError if HttpPostClient returns 400', async () => {
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };

    const promise = sut.auth(mockAuthenticationCredentials());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('should throw UnexpectedError if HttpPostClient returns 500', async () => {
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };

    const promise = sut.auth(mockAuthenticationCredentials());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('should throw UnexpectedError if HttpPostClient returns 404', async () => {
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };

    const promise = sut.auth(mockAuthenticationCredentials());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
