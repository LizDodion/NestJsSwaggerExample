import { extendArrayMetadata } from '@nestjs/common/utils/extend-metadata.util';
import { EVENT_LISTENER_METADATA } from '@nestjs/event-emitter/dist/constants';
import { decoratorFactoryFn } from './onPyneaEvent.decorator';

jest.mock('@nestjs/common/utils/extend-metadata.util', () => ({
  extendArrayMetadata: jest.fn(),
}));

jest.mock('@nestjs/common', () => ({
  ...jest.requireActual('@nestjs/common'),
  Inject: jest.fn().mockImplementation(() => {
    return (target, val): void => {
      target.logger = {
        log: jest.fn(),
      };
    };
  }),
}));

describe('OnPyneaEvent decorator', () => {
  let mockedInjectLogger: any;
  const mockedLog = jest.fn();

  beforeEach(() => {
    mockedInjectLogger = jest.fn().mockImplementation(() => {
      return (target, val): void => {
        target.logger = {
          log: mockedLog,
        };
      };
    });
  });

  it('Should bind to the correct key', () => {
    const decoratorFunction = decoratorFactoryFn({
      injectLogger: mockedInjectLogger,
      event: 'an.event',
    });
    const testHandler = jest.fn();
    decoratorFunction({}, 'key', { value: testHandler });
    expect(extendArrayMetadata).toHaveBeenCalledWith(
      EVENT_LISTENER_METADATA,
      [{ event: 'an.event' }],
      expect.any(Function),
    );
  });

  it('should inject the logger', () => {
    const decoratorFunction = decoratorFactoryFn({
      injectLogger: mockedInjectLogger,
      event: 'an.event',
    });
    const testHandler = jest.fn();
    decoratorFunction({}, 'key', { value: testHandler });
    expect(mockedInjectLogger).toHaveBeenCalled();
  });

  it('should call the log function and the underlying function', async () => {
    const decoratorFunction = decoratorFactoryFn({
      injectLogger: mockedInjectLogger,
      event: 'an.event',
    });
    const testHandler = jest.fn();
    const descriptor: any = {
      value: testHandler,
    };
    const decoratedDescriptor = decoratorFunction(
      { logger: { log: mockedLog } },
      'key',
      descriptor,
    );
    const args = [
      /* provide any necessary arguments */
    ];
    await decoratedDescriptor.value.apply({ logger: { log: mockedLog } }, args);
    expect(mockedLog).toHaveBeenCalled();
    expect(testHandler).toHaveBeenCalled();
  });
});
