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
    /*  ...(isExternalApi ? {} : { ...authorization }), */
  };

  return headers;
}

async function getAuthorizationHeader() {
  let token = "";
  try {
    token = localStorage.getItem("token") || "";
  } catch (error) {
    console.error({ error: `Failed to retrieve token: ${error}` });
    throw new Error("Authentication failed");
  }

  return { Authorization: `Bearer ${token}` };
}
