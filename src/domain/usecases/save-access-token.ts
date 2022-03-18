export namespace SaveAccessToken {
  export type Params = {
    accessToken: string;
  };
}

export interface SaveAccessToken {
  save(params: SaveAccessToken.Params): Promise<void>;
}
