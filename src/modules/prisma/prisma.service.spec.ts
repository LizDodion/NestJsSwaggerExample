import { mock } from 'jest-mock-extended';
import { ConfigService } from '@api-core/modules/config/config.service';
import { LoggerService } from '@api-core/modules/logger/logger.service';
import { PrismaClient } from '@api-core/generated/prisma-client';
import { getMockConfigService } from '../config/testing/mockConfigService';
import { PrismaService } from './prisma.service';
import { createPrismaExtended } from './extensions/extended.client';

jest.mock('./extensions/extended.client');

describe('PrismaService', () => {
  let prismaService: PrismaService;
  let mockLoggerService: LoggerService;
  let mockConfigService: ConfigService;
  let mockCreatePrismaExtended: jest.MockedFunction<
    typeof createPrismaExtended
  >;

  beforeEach(() => {
    // clear all spies
    jest.clearAllMocks();
    mockLoggerService = mock<LoggerService>({
      prismaLog: jest.fn(),
    });
    mockConfigService = getMockConfigService({ IS_PRISMA_LOG_ENABLED: true });
    mockCreatePrismaExtended = createPrismaExtended as jest.MockedFunction<
      typeof createPrismaExtended
    >;
  });

  it('should setup the prisma service with right configuration', () => {
    const spyOnPrismaSetup = jest.spyOn(PrismaClient.prototype, '$on');
    prismaService = new PrismaService(mockConfigService, mockLoggerService);

    expect(prismaService).toBeDefined();
    expect(spyOnPrismaSetup).toHaveBeenCalledTimes(4);
    expect(spyOnPrismaSetup).toHaveBeenCalledWith(
      'query',
      expect.any(Function),
    );
    expect(spyOnPrismaSetup).toHaveBeenCalledWith('info', expect.any(Function));
    expect(spyOnPrismaSetup).toHaveBeenCalledWith('warn', expect.any(Function));
    expect(spyOnPrismaSetup).toHaveBeenCalledWith(
      'error',
      expect.any(Function),
    );
  });

  it('should setup the prisma service without logging if isPrismaLogEnabled is false', () => {
    mockConfigService = getMockConfigService({ IS_PRISMA_LOG_ENABLED: false });
    const spyOnPrismaSetup = jest.spyOn(PrismaClient.prototype, '$on');
    prismaService = new PrismaService(mockConfigService, mockLoggerService);

    expect(prismaService).toBeDefined();
    expect(spyOnPrismaSetup).toHaveBeenCalledTimes(0);
  });

  it('should provide a .extended variant with custom client extensions', () => {
    mockConfigService = getMockConfigService({ IS_PRISMA_LOG_ENABLED: false });
    prismaService = new PrismaService(mockConfigService, mockLoggerService);

    expect(prismaService).toBeDefined();
    prismaService.extended;
    expect(mockCreatePrismaExtended).toHaveBeenCalled();
  });
});
