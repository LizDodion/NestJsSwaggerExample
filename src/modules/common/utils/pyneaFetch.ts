/* eslint-disable @elinks/elinks/no-native-fetch */
import { FailedDependencyException } from "../exceptions/failedDependency.exception";

async function elinksFetch<T = object>(
  url: string,
  options?: RequestInit
): Promise<{ raw: Response; body: T }> {
  const response = await fetch(url, options);
  const isJSON = response.headers
    .get("Content-Type")
    ?.includes("application/json");

  const responseBody = isJSON
    ? ((await response.json()) as T)
    : ((await response.text()) as T);

  if (!response.ok) {
    throw new FailedDependencyException({
      url,
      status: response.status.toString(),
      responseBody,
    });
  }

  return { raw: response, body: responseBody };
}

export default elinksFetch;
