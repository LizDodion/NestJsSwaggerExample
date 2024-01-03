import { webcrypto, randomUUID } from 'crypto';
import { MathUtils } from './math.utils';

jest.mock('crypto', () => ({
  webcrypto: {
    getRandomValues: jest.fn(),
  },
  randomUUID: jest.fn(),
}));

const mockWebcrypto = webcrypto as jest.Mocked<typeof webcrypto>;
const mockRandomUUID = randomUUID as jest.MockedFunction<typeof randomUUID>;

const testData = {
  randomDigitNumber: 5,
  randomUUID: 'some-random-uuid ',
};

describe('MathUtils', () => {
  beforeEach(() => {
    mockWebcrypto.getRandomValues.mockReset();
    mockRandomUUID.mockReset();
  });

  describe('generateRandomDigitNumber', () => {
    it('should correctly generate a random digit number', () => {
      mockWebcrypto.getRandomValues.mockReturnValueOnce(
        new Uint32Array([testData.randomDigitNumber]),
      );

      const mathUtils = new MathUtils();
      const result = mathUtils.generateRandomDigitNumber();

      expect(result).toEqual(testData.randomDigitNumber % 10);
    });
  });

  describe('generateRandomCodeFourDigits', () => {
    it('should correctly generate a random code with four digits', () => {
      mockWebcrypto.getRandomValues.mockReturnValue(
        new Uint32Array([1, 2, 3, 4, 5, 6, 7, 8]),
      );

      const mathUtils = new MathUtils();
      const result = mathUtils.generateRandomPassword(8);

      expect(mockWebcrypto.getRandomValues).toHaveBeenCalledTimes(1);
      expect(result).toEqual('BCDEFGHI');
    });
  });

  describe('generateRandomPassword', () => {
    it('should correctly generate a random password for a given length', () => {
      mockWebcrypto.getRandomValues.mockReturnValue([
        new Uint32Array([testData.randomDigitNumber]),
      ] as any);

      const mathUtils = new MathUtils();
      const result = mathUtils.generateRandomCodeFourDigits();

      expect(mockWebcrypto.getRandomValues).toHaveBeenCalledTimes(4);
      expect(result).toEqual(
        [0, 0, 0, 0].map(() => testData.randomDigitNumber % 10).join(''),
      );
    });
  });

  describe('generateRandomHashForRequestId', () => {
    it('should correctly generate a random hash for the request ID', () => {
      mockRandomUUID.mockReturnValueOnce(testData.randomUUID as any);

      const mathUtils = new MathUtils();
      const result = mathUtils.generateRandomHashForRequestId();

      expect(result).toEqual(testData.randomUUID.slice(0, 8));
    });
  });
});
