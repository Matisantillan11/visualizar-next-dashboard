export async function getHeaders({
  isExternalApi,
  withAuthentication,
  init,
}: {
  isExternalApi: boolean;
  withAuthentication: boolean;
  init?: RequestInit | undefined;
}) {
  const authorization =
    !isExternalApi && withAuthentication ? await getAuthorizationHeader() : {};

  const headers = {
    ...init?.headers,
    ...(isExternalApi ? {} : { ...authorization }),
  };

  return headers;
}

async function getAuthorizationHeader(): Promise<Record<string, string>> {
  let token = "";
  try {
    // Import the cookie utility
    const { getAccessToken } = await import("@/lib/auth/cookies");
    token = (await getAccessToken()) || "";

    if (!token) {
      console.warn("No access token found in cookies");
      return {};
    }
  } catch (error) {
    console.error({ error: `Failed to retrieve token: ${error}` });
    return {}; // Return empty object instead of throwing to prevent build errors
  }

  return { Authorization: `Bearer ${token}` };
}
