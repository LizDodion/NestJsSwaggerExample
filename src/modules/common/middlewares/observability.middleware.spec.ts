import { FastifyRequest, FastifyReply } from 'fastify';
import { mock } from 'jest-mock-extended';
import { LoggerService } from '@api-core/modules/logger/logger.service';
import { MathUtils } from '../utils/math.utils';
import { ObservabilityMiddleware } from './observability.middleware';

const testData = {
  req: {
    url: 'some-url',
    method: 'some-method',
  },
  res: {},
  randomHashGenerated: 'some-random-hash',
};

describe('ObservabilityMiddleware', () => {
  let observabilityMiddleware: ObservabilityMiddleware;
  let mockLoggerService: LoggerService;
  let mockMathUtils: MathUtils;
  let mockReq: FastifyRequest['raw'];
  let mockRes: FastifyReply['raw'];

  beforeEach(() => {
    mockLoggerService = mock<LoggerService>({
      log: jest.fn(),
      setRequestId: jest.fn(),
    });
    mockMathUtils = mock<MathUtils>({
      generateRandomHashForRequestId: jest.fn(
        () => testData.randomHashGenerated,
      ),
    });
    mockReq = mock<FastifyRequest['raw']>({
      url: testData.req.url,
      method: testData.req.method,
    });
    mockRes = mock<FastifyReply['raw']>({});

    observabilityMiddleware = new ObservabilityMiddleware(
      mockLoggerService,
      mockMathUtils,
    );
  });

  it('should correctly define the middleware with a use method', () => {
    const mockNext = jest.fn();

    expect(observabilityMiddleware.use).toBeDefined();
    expect(observabilityMiddleware.use).toBeInstanceOf(Function);
    // call the use method that defines the middleware
    observabilityMiddleware.use(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });

  it('should correctly generate a random hash for the request ID', () => {
    observabilityMiddleware.use(mockReq, mockRes, () => {});

    expect(mockMathUtils.generateRandomHashForRequestId).toHaveBeenCalled();
    expect(mockReq['requestId']).toEqual(testData.randomHashGenerated);
  });

  it('should correctly log the request', () => {
    observabilityMiddleware.use(mockReq, mockRes, () => {});
    expect(mockLoggerService.log).toHaveBeenCalledWith('🟢 request received', {
      req: {
        id: testData.randomHashGenerated,
        url: testData.req.url,
        method: testData.req.method,
      },
    });
  });

  it('should correctly set the request ID on the logger', () => {
    observabilityMiddleware.use(mockReq, mockRes, () => {});

    expect(mockLoggerService.setRequestId).toHaveBeenCalledWith(
      testData.randomHashGenerated,
    );
  });
});
