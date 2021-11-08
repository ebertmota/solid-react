import faker from 'faker';
import axios from 'axios';
import { AxiosHttpClient } from './axios-http-client';
import { HttpPostParams } from '@/data/protocols/http';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

describe('AxiosHttpClient', () => {
  let sut: AxiosHttpClient;

  beforeEach(() => {
    sut = new AxiosHttpClient();
  });

  it('should call axios with correct values', async () => {
    const request = mockPostRequest();

    await sut.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });
});
