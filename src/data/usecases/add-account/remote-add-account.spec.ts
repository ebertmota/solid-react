import { HttpPostClientSpy } from '@/data/test';
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
});
