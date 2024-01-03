import { mock } from 'jest-mock-extended';
import { LoggerService } from '../../logger/logger.service';
import { HealthcheckListener } from './healthcheck.listener';

describe('HealthcheckListener', () => {
  let mockLoggerService: LoggerService;
  let healthcheckListener: HealthcheckListener;

  beforeEach(() => {
    mockLoggerService = mock<LoggerService>({
      log: jest.fn(),
    });
    healthcheckListener = new HealthcheckListener(mockLoggerService);
  });

  it('should be defined', () => {
    expect(healthcheckListener).toBeDefined();
  });

  it('should have the OnPyneaEvent decorator applied', () => {
    expect(healthcheckListener.ping).toStrictHavePyneaEventDecorator();
  });

  it('should call the log service', () => {
    healthcheckListener.ping({ message: 'A message' });
    expect(mockLoggerService.log).toHaveBeenCalled();
  });
});
