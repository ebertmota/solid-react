import faker from 'faker';
import { HttpStatusCode } from '@/data/protocols/http';
import { mockAuthenticationCredentials, mockAccountModel } from '@/domain/test';
import { AccountModel } from '@/domain/models';
import { AuthenticationCredentials } from '@/domain/usecases';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClientSpy } from '../../test';

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

  it('should return an AccountModel if HttpPostClient returns 200', async () => {
    const httpResult = mockAccountModel();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };

    const account = await sut.auth(mockAuthenticationCredentials());

    expect(account).toEqual(httpResult);
  });
});
