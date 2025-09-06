import { BASE_URL } from "./constants";
import { APIFetchArgs } from "./types";
import { getHeaders } from "./utils";

/**
 * Base API fetch function that handles authentication and response parsing.
 *
 * @param param0 - An object containing the following properties:
 *   - url: The endpoint for the request - string url.
 *   - init: Optional configuration for the fetch request.
 *   - withAuthentication: Optional flag to enable/disable authentication.
 * @returns - A Promise that resolves to the parsed response data or rejects with an error.
 */
export const fetcher = async <T>({
  url,
  init,
  withAuthentication = true,
}: APIFetchArgs): Promise<T> => {
  const isExternalApi = url.includes("https") || url.includes("http");
  const endpoint = isExternalApi ? url : `${BASE_URL}${url}`;

  const headers = await getHeaders({ isExternalApi, withAuthentication, init });
  const request = new Request(endpoint, {
    ...init,
    headers,
  });

  try {
    const response = await fetch(request);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error({
      error: `Error fetching data: ${url} -> isExternalApi ${isExternalApi} Error: ${error}`,
    });
    throw error;
  }
};
