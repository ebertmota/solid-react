import { SetStorage } from '@/data/protocols/cache';

export class LocalStorageAdapter implements SetStorage {
  async set(input: SetStorage.Input): Promise<void> {
    const { key, value } = input;
    localStorage.setItem(key, value);
  }
}
