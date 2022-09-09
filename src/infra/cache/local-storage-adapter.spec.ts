import { SetStorage } from '@/data/protocols/cache';
import 'jest-localstorage-mock';
import { LocalStorageAdapter } from './local-storage-adapter';

describe('LocalStorageAdapter', () => {
  let sut: LocalStorageAdapter;
  let sutParams: SetStorage.Input;

  beforeAll(() => {
    sutParams = {
      key: 'any_key',
      value: 'any_value',
    };
  });

  beforeEach(() => {
    localStorage.clear();
    sut = new LocalStorageAdapter();
  });

  it('should call localStorage with correct values', async () => {
    await sut.set(sutParams);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      sutParams.key,
      sutParams.value,
    );
  });
});
