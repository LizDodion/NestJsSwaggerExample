import { LoggerService } from '@api-core/modules/logger/logger.service';
import { mock } from 'jest-mock-extended';
import { AppConfigInput } from '../dto/appConfig.input';
import { ConfigService } from '../config.service';

const mockLoggerService = mock<LoggerService>({
  log: jest.fn(),
  setRequestId: jest.fn(),
});

export class MockConfigService extends ConfigService {
  public readonly variable: AppConfigInput;

  constructor(
    envVariables: Partial<AppConfigInput>,
    protected readonly loggerService: LoggerService,
  ) {
    super(loggerService);

    this.variable = this.validateConfig({
      ...process.env,
      ...envVariables,
    } as any);
  }
}

export const mockConfigService = new MockConfigService(
  {} as any,
  mockLoggerService,
);

export const getMockConfigService = (
  envVariables: Partial<AppConfigInput> = {} as any,
): MockConfigService => new MockConfigService(envVariables, mockLoggerService);
