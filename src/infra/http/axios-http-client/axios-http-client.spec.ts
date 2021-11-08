import faker from 'faker';
import axios from 'axios';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AxiosHttpClient', () => {
  let sut: AxiosHttpClient;

  beforeEach(() => {
    sut = new AxiosHttpClient();
  });

  it('should call axios with correct URL', async () => {
    const url = faker.internet.url();

    await sut.post({ url });

    expect(mockedAxios).toHaveBeenCalledWith(url);
  });
});
