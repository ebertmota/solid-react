type Params = {
  accessToken: string;
};

export type SaveAccessToken = (params: Params) => Promise<void>;

// type Setup = (
//   fileStorage: UploadFile & DeleteFile,
//   crypto: UUIDGenerator,
//   userProfileRepo: SaveUserPicture & LoadUserProfile,
// ) => SaveAccessToken;
