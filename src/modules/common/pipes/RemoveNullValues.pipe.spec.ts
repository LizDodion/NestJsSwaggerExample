import { ArgumentMetadata } from '@nestjs/common';
import { RemoveNullValuesPipe } from './RemoveNullValues.pipe';

const testCases = [
  { input: null, expected: null },
  { input: undefined, expected: undefined },
  {
    input: {
      name: 'John',
      age: null,
      city: 'London',
      zipCode: undefined,
      address: 'Some address',
      bio: '',
    },
    expected: {
      name: 'John',
      city: 'London',
      address: 'Some address',
      bio: '',
    },
  },
  // Add more test cases here
];

describe('RemoveNullValuesPipe', () => {
  let removeNullValuesPipe: RemoveNullValuesPipe;
  let mockMetadata: jest.Mocked<ArgumentMetadata>;

  beforeEach(() => {
    removeNullValuesPipe = new RemoveNullValuesPipe();
    mockMetadata = {} as jest.Mocked<ArgumentMetadata>;
  });

  it('should correctly define the pipe with a transform method', () => {
    expect(removeNullValuesPipe).toBeDefined();
    expect(removeNullValuesPipe.transform).toBeInstanceOf(Function);
  });

  testCases.forEach(({ input, expected }) => {
    it(`should remove null values from the object ${JSON.stringify(
      input,
    )}`, () => {
      expect(removeNullValuesPipe.transform(input, mockMetadata)).toEqual(
        expected,
      );
    });
  });
});
