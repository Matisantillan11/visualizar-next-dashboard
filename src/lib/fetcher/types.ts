export type APIFetchArgs = {
  url: string;
  init?: RequestInit | undefined;
  withAuthentication?: boolean;
};

export type ApiResponse<T> = { body: T };
