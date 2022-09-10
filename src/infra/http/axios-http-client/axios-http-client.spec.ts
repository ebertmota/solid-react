import { mockAxios, mockHttpResponse } from '@/infra/test';
import { mockPostRequest } from '@/data/test';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');

describe('AxiosHttpClient', () => {
  let sut: AxiosHttpClient;
  const mockedAxios = mockAxios();

  beforeEach(() => {
    sut = new AxiosHttpClient();
  });

  it('should call axios with correct values', async () => {
    const request = mockPostRequest();

    await sut.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  it('should return the correct statusCode and body', () => {
    const promise = sut.post(mockPostRequest());
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });

  it('should return the correct statusCode and body on failure', () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: mockHttpResponse(),
    });
    const promise = sut.post(mockPostRequest());
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });
});
