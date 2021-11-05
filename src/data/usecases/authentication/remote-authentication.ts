import { HttpStatusCode, HttpPostClient } from '@/data/protocols/http';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { Authentication, AuthenticationCredentials } from '@/domain/usecases';

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AuthenticationCredentials,
      AccountModel
    >,
  ) {}

  async auth(params: AuthenticationCredentials): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}
