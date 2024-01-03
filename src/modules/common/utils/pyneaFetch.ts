/* eslint-disable @pynea/pynea/no-native-fetch */
import { FailedDependencyException } from '../exceptions/failedDependency.exception';

async function pyneaFetch<T = object>(
  url: string,
  options?: RequestInit,
): Promise<{ raw: Response; body: T }> {
  const response = await fetch(url, options);
  const isJSON = response.headers
    .get('Content-Type')
    ?.includes('application/json');

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

export default pyneaFetch;
