import { SetStorage } from '@/data/protocols/cache';
import { SaveAccessToken } from '@/domain/usecases';
import { mock, MockProxy } from 'jest-mock-extended';
import { LocalSaveAccessToken } from './local-save-access-token';

describe('LocalSaveAccessToken', () => {
  let setStorage: MockProxy<SetStorage>;
  let sutParams: SaveAccessToken.Params;
  let sut: LocalSaveAccessToken;

  beforeAll(() => {
    sutParams = {
      accessToken: 'any_access_token',
    };
    setStorage = mock();
  });

  beforeEach(() => {
    sut = new LocalSaveAccessToken(setStorage);
  });

  it('should call setStorage with correct value', async () => {
    await sut.save(sutParams);

    expect(setStorage.set).toHaveBeenCalledWith({
      key: 'accessToken',
      value: sutParams.accessToken,
    });
    expect(setStorage.set).toHaveBeenCalledTimes(1);
  });
});
