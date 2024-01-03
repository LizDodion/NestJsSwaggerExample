import { MockProxy } from 'jest-mock-extended';
import { FailedDependencyException } from '../exceptions/failedDependency.exception';
import pyneaFetch from './pyneaFetch';

describe('pyneaFetch', () => {
  let fetch: MockProxy<typeof global.fetch>;

  beforeEach(() => {
    // Mock the global fetch function
    fetch = jest.fn();
    global.fetch = fetch;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should make a request to the specified URL with the provided options', async () => {
    const url = 'https://api.example.com/data';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key: 'value' }),
    };

    const responseData = { id: 1, name: 'John Doe' };
    const response = new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

    (global.fetch as jest.Mock).mockResolvedValue(response);

    await pyneaFetch(url, options);

    expect(fetch).toHaveBeenCalledWith(url, options);
  });

  it('should return the raw response and parsed data', async () => {
    const url = 'https://api.example.com/data';
    const responseData = { id: 1, name: 'John Doe' };
    const response = new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

    (global.fetch as jest.Mock).mockResolvedValue(response);

    const result = await pyneaFetch(url);

    expect(result.raw).toEqual(response);
    expect(result.body).toEqual(responseData);
  });

  it('should throw FailedDependencyException if the request fails', async () => {
    const url = 'https://api.example.com/data';
    const response = new Response(null, { status: 500 });

    (global.fetch as jest.Mock).mockResolvedValue(response);

    await expect(pyneaFetch(url)).rejects.toThrow(FailedDependencyException);
  });
});
