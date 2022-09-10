import { HttpStatusCode } from '@/data/protocols/http';
import { HttpPostClientSpy } from '@/data/test';
import { EmailInUseError, UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { mockAddAccountParams } from '@/domain/test';
import { AddAccountParams } from '@/domain/usecases';
import { RemoteAddAccount } from './remote-add-account';

describe('RemoteAddAccount', () => {
  let httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>;
  let url: string;
  let sut: RemoteAddAccount;

  beforeAll(() => {
    url = 'any_url';
    httpPostClientSpy = new HttpPostClientSpy();
  });

  beforeEach(() => {
    sut = new RemoteAddAccount(url, httpPostClientSpy);
  });

  it('should call HttpPostClient with correct URL', async () => {
    await sut.add(mockAddAccountParams());

    expect(httpPostClientSpy.url).toBe(url);
  });

  it('should call HttpPostClient with correct body', async () => {
    const params = mockAddAccountParams();
    await sut.add(params);

    expect(httpPostClientSpy.body).toEqual(params);
  });

  it('should throw EmailInUseError if HttpPostClient returns 403', async () => {
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };

    const promise = sut.add(mockAddAccountParams());

    await expect(promise).rejects.toThrow(new EmailInUseError());
  });

  it('should throw UnexpectedError if HttpPostClient returns 400', async () => {
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };

    const promise = sut.add(mockAddAccountParams());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
