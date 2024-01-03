import { mock } from 'jest-mock-extended';
import { PrismaService } from '@api-core/modules/prisma/prisma.service';
import { LoggerService } from '@api-core/modules/logger/logger.service';
import { mockConfigService } from '@api-core/testing/jest.setup';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { HealthcheckMessageResponse, Message } from '../dto';
import { HealthCheckEvents } from '../listeners/healthcheck.event';
import { HealthcheckService } from './healthcheck.service';

jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

type PrismaServiceHealthcheck = Pick<PrismaService['healthcheck'], 'findFirst'>;

const getPrismaServiceMock = (
  prismaHealthcheckMocked?: Partial<PrismaServiceHealthcheck>,
): PrismaService =>
  ({
    healthcheck: {
      findFirst: jest.fn(),
      ...prismaHealthcheckMocked,
    },
  }) as PrismaService;

describe('HealthcheckService', () => {
  let healthcheckService: HealthcheckService;
  let mockPrismaService: PrismaService;
  let mockLoggerService: LoggerService;
  let mockEventEmitter: EventEmitter2;
  const date = new Date();

  beforeEach(() => {
    mockPrismaService = getPrismaServiceMock();
    mockConfigService.variable.IS_PRISMA_LOG_ENABLED = true;
    mockLoggerService = mock<LoggerService>({
      log: jest.fn(),
      error: jest.fn(),
    });
    mockEventEmitter = mock<EventEmitter2>({
      emit: jest.fn(),
    });
    healthcheckService = new HealthcheckService(
      mockPrismaService,
      mockConfigService,
      mockEventEmitter,
      mockLoggerService,
    );
  });

  it('should return Database is not available error, as nothing is in database', async () => {
    healthcheckService = new HealthcheckService(
      mockPrismaService,
      mockConfigService,
      mockEventEmitter,
      mockLoggerService,
    );
    healthcheckService.healthcheckPingDatabase().catch((e) => {
      expect(e.message).toBe('Database is not available');
    });
  });

  it('should return healthcheck response when there is an entry in the database', async () => {
    mockPrismaService = getPrismaServiceMock({
      findFirst: jest.fn(() =>
        Promise.resolve({ message: 'test' } as HealthcheckMessageResponse),
      ) as any,
    });
    healthcheckService = new HealthcheckService(
      mockPrismaService,
      mockConfigService,
      mockEventEmitter,
      mockLoggerService,
    );
    const response = await healthcheckService.healthcheckPingDatabase();

    expect(response).toEqual({ message: 'test', dateTime: undefined });
  });

  it('should return a message', () => {
    expect(healthcheckService.get()).toEqual({
      message: 'Pong',
      dateTime: date,
    });
  });

  it('should emit an event', () => {
    healthcheckService.get();
    expect(mockEventEmitter.emit).toBeCalledWith(HealthCheckEvents.Ping, {
      message: 'Ping',
    });
  });

  it('should sanitise data', () => {
    expect(healthcheckService).toSanitiseData(
      'healthcheckPingDatabase',
      Message,
    );
  });
});
