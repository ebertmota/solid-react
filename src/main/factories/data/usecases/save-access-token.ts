import { LocalSaveAccessToken } from '@/data/usecases/save-access-token/local-save-access-token';
import { SaveAccessToken } from '@/domain/usecases';
import { makeLocalStorageAdapter } from '@/main/factories/infra';

export const makeSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter());
};
