import { ExecutionContext, CallHandler } from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { mock } from 'jest-mock-extended';
import { LoggerService } from '@api-core/modules/logger/logger.service';
import { mockConfigService } from '@api-core/testing/jest.setup';
import { ResolverLoggingInterceptor } from './resolverLogging.interceptor';

jest.mock('rxjs/operators', () => ({
  tap: jest.fn().mockImplementation(
    (fn) =>
      (source$): any =>
        source$.pipe(
          tap((value) => {
            fn(value);
            return value;
          }),
        ),
  ),
}));

const testData = {
  ctx: {
    mode: 'some-mode',
    module: 'some-module',
    resolver: 'some-resolver',
    type: 'mutation',
  },
};

describe('ResolverLoggingInterceptor', () => {
  let resolverLoggingInterceptor: ResolverLoggingInterceptor;
  let mockLoggerService: LoggerService;
  let mockExecutionContext: ExecutionContext;
  let mockCallHandler: CallHandler;
  const mockRxjsTap = tap as jest.MockedFunction<typeof tap>;

  beforeEach(() => {
    mockConfigService.variable.IS_PRISMA_LOG_ENABLED = true;
    mockLoggerService = mock<LoggerService>({
      log: jest.fn(),
    });
    mockExecutionContext = mock<ExecutionContext>({
      getType: jest.fn(() => testData.ctx.mode),
      getClass: jest.fn(() => ({ name: `${testData.ctx.module}Resolver` })),
      getHandler: jest.fn(() => ({ name: testData.ctx.resolver })),
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn(() => ({ url: 'some-url?some=param' })),
      })),
      getArgs: jest.fn(() => [
        { raw: { query: { some: 'arg' } } },
        {},
        {
          __currentQuery: `mutation { some-graphql-mutation }`,
        },
        {
          variableValues: {
            some: 'variable',
          },
        },
      ]),
    } as any);
    mockCallHandler = mock<CallHandler>({
      handle: jest.fn(() => ({
        pipe: jest.fn(mockRxjsTap),
      })),
    } as any);

    resolverLoggingInterceptor = new ResolverLoggingInterceptor(
      mockConfigService,
      mockLoggerService,
    );
  });

  describe('graphql', () => {
    beforeEach(() => {
      mockExecutionContext.getType = jest.fn(() => 'graphql' as any);
    });
    it('should correctly define the interceptor with an intercept method', () => {
      expect(resolverLoggingInterceptor.intercept).toBeDefined();
      expect(resolverLoggingInterceptor.intercept).toBeInstanceOf(Function);

      resolverLoggingInterceptor.intercept(
        mockExecutionContext,
        mockCallHandler,
      );
      expect(mockCallHandler.handle).toHaveBeenCalled();
    });

    it('should correctly log the graphql request', () => {
      resolverLoggingInterceptor.intercept(
        mockExecutionContext,
        mockCallHandler,
      );
      expect((mockLoggerService.log as jest.Mock).mock.calls).toEqual([
        [
          '✅ graphql received',
          {
            ctx: {
              mode: 'graphql',
              module: 'some-module',
              resolver: 'some-resolver',
              type: 'mutation',
            },
          },
        ],
        [
          '🧪 gql: mutation { some-graphql-mutation }\n✏️ gqlVariables: {\n  "some": "variable"\n}',
        ],
      ]);
    });

    it('should correctly log the graphql request when it is a query', () => {
      mockExecutionContext.getArgs = jest.fn(
        () =>
          [
            {},
            {},
            {
              __currentQuery: `query { some-graphql-query }`,
            },
            {
              variableValues: {
                some: 'variable',
              },
            },
          ] as any,
      );

      resolverLoggingInterceptor.intercept(
        mockExecutionContext,
        mockCallHandler,
      );
      expect((mockLoggerService.log as jest.Mock).mock.calls).toEqual([
        [
          '✅ graphql received',
          {
            ctx: {
              mode: 'graphql',
              module: 'some-module',
              resolver: 'some-resolver',
              type: 'query',
            },
          },
        ],
        [
          '🧪 gql: query { some-graphql-query }\n✏️ gqlVariables: {\n  "some": "variable"\n}',
        ],
      ]);
    });

    it('should correctly log the graphql query if enabled', () => {
      resolverLoggingInterceptor.intercept(
        mockExecutionContext,
        mockCallHandler,
      );
      expect((mockLoggerService.log as jest.Mock).mock.calls).toEqual([
        [
          '✅ graphql received',
          {
            ctx: {
              mode: 'graphql',
              module: 'some-module',
              resolver: 'some-resolver',
              type: 'mutation',
            },
          },
        ],
        [
          '🧪 gql: mutation { some-graphql-mutation }\n✏️ gqlVariables: {\n  "some": "variable"\n}',
        ],
      ]);
    });

    it('should not log the graphql query if disabled', () => {
      //@ts-expect-error - read-only property is being mocked
      mockConfigService.isGraphqlQueryLogEnabled = false;
      resolverLoggingInterceptor.intercept(
        mockExecutionContext,
        mockCallHandler,
      );
      expect((mockLoggerService.log as jest.Mock).mock.calls).toEqual([
        [
          '✅ graphql received',
          {
            ctx: {
              mode: 'graphql',
              module: 'some-module',
              resolver: 'some-resolver',
              type: 'mutation',
            },
          },
        ],
      ]);
    });
  });

  describe('controller', () => {
    beforeEach(() => {
      mockExecutionContext.getType = jest.fn(() => 'http' as any);
      mockExecutionContext.getClass = jest.fn(
        () =>
          ({
            name: `${testData.ctx.module}Controller`,
          }) as any,
      );
    });
    it('should correctly define the interceptor with an intercept method', () => {
      expect(resolverLoggingInterceptor.intercept).toBeDefined();
      expect(resolverLoggingInterceptor.intercept).toBeInstanceOf(Function);

      resolverLoggingInterceptor.intercept(
        mockExecutionContext,
        mockCallHandler,
      );
      expect(mockCallHandler.handle).toHaveBeenCalled();
    });

    it('should correctly log the graphql request', () => {
      resolverLoggingInterceptor.intercept(
        mockExecutionContext,
        mockCallHandler,
      );
      expect(mockLoggerService.log).toHaveBeenCalledWith(
        '✅ controller request received',
        {
          ctx: {
            mode: 'http',
            module: testData.ctx.module,
            fullUrl: 'some-url',
            controller: testData.ctx.resolver,
          },
        },
      );
    });

    it('should correctly log the graphql query if enabled', () => {
      //@ts-expect-error - read-only property is being mocked
      mockConfigService.isGraphqlQueryLogEnabled = true;
      resolverLoggingInterceptor.intercept(
        mockExecutionContext,
        mockCallHandler,
      );
      expect((mockLoggerService.log as jest.Mock).mock.calls).toEqual([
        [
          '✅ controller request received',
          {
            ctx: {
              controller: 'some-resolver',
              fullUrl: 'some-url',
              mode: 'http',
              module: 'some-module',
            },
          },
        ],
        ['🧪 controller args: {"some":"arg"}'],
      ]);
    });

    it('should not log the graphql query if disabled', () => {
      //@ts-expect-error - read-only property is being mocked
      mockConfigService.isGraphqlQueryLogEnabled = false;
      resolverLoggingInterceptor.intercept(
        mockExecutionContext,
        mockCallHandler,
      );
      expect((mockLoggerService.log as jest.Mock).mock.calls).toEqual([
        [
          '✅ controller request received',
          {
            ctx: {
              controller: 'some-resolver',
              fullUrl: 'some-url',
              mode: 'http',
              module: 'some-module',
            },
          },
        ],
      ]);
    });
  });
});
