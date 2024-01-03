import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from 'nestjs-pino';
import { LoggerService } from './logger.service';

const testData = {
  requestId: 'some-request-id',
  logMessage: {
    message: 'some-message',
    data: 'some-data',
    someUsefulData: 'some-useful-data',
  },
  logContext: {
    context: 'some-context',
    data: 'some-data',
    someOtherData: 'some-other-data',
  },
};

describe('LoggerService', () => {
  let loggerService: LoggerService;
  let mockPinoLogger: Logger;

  beforeEach(async () => {
    mockPinoLogger = {
      error: jest.fn(),
      log: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      verbose: jest.fn(),
    } as unknown as jest.Mocked<Logger>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoggerService,
        {
          provide: Logger,
          useValue: mockPinoLogger,
        },
      ],
    }).compile();

    loggerService = module.get<LoggerService>(LoggerService);
  });

  describe('requestId', () => {
    it('should set and get the request ID', async () => {
      loggerService.setRequestId(testData.requestId);

      expect(await loggerService.getRequestId()).toEqual(testData.requestId);
    });
  });

  describe('error', () => {
    it('should log an error', () => {
      loggerService.error(testData.logMessage, testData.logContext);

      expect(mockPinoLogger.error).toHaveBeenCalledWith(
        testData.logMessage,
        testData.logContext,
      );
    });
  });

  describe('log', () => {
    it('should log a message', () => {
      loggerService.log(testData.logMessage, testData.logContext);

      expect(mockPinoLogger.log).toHaveBeenCalledWith(
        testData.logMessage,
        testData.logContext,
      );
    });
  });

  describe('warn', () => {
    it('should log a warning', () => {
      loggerService.warn(testData.logMessage, testData.logContext);

      expect(mockPinoLogger.warn).toHaveBeenCalledWith(
        testData.logMessage,
        testData.logContext,
      );
    });
  });

  describe('debug', () => {
    it('should log a debug message', () => {
      loggerService.debug(testData.logMessage, testData.logContext);

      expect(mockPinoLogger.debug).toHaveBeenCalledWith(
        testData.logMessage,
        testData.logContext,
      );
    });
  });

  describe('verbose', () => {
    it('should log a verbose message', () => {
      loggerService.verbose(testData.logMessage, testData.logContext);

      expect(mockPinoLogger.verbose).toHaveBeenCalledWith(
        testData.logMessage,
        testData.logContext,
      );
    });
  });

  describe('prismaLog', () => {
    it('should log a Prisma message', async () => {
      await loggerService.setRequestId(testData.requestId);
      await loggerService.prismaLog(testData.logMessage, testData.logContext);

      expect(mockPinoLogger.log).toHaveBeenCalledWith(testData.logMessage, {
        ...testData.logContext,
        requestId: testData.requestId,
      });
    });
  });

  describe('prismaError', () => {
    it('should log a Prisma error', async () => {
      await loggerService.setRequestId(testData.requestId);
      await loggerService.prismaError(testData.logMessage, testData.logContext);

      expect(mockPinoLogger.error).toHaveBeenCalledWith(testData.logMessage, {
        ...testData.logContext,
        requestId: testData.requestId,
      });
    });
  });
});
