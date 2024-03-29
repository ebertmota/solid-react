export namespace SetStorage {
  export type Input = {
    key: string;
    value: any;
  };
}

export interface SetStorage {
  set(input: SetStorage.Input): Promise<void>;
}
