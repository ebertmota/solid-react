import { SetStorage } from '@/data/protocols/cache';
import { SaveAccessToken } from '@/domain/usecases';

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly setStorage: SetStorage) {}

  async save(params: SaveAccessToken.Params): Promise<void> {
    const { accessToken } = params;

    await this.setStorage.set({
      key: 'accessToken',
      value: accessToken,
    });
  }
}
