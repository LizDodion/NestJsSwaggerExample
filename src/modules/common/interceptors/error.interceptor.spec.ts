import { LoggerService } from "@api-core/modules/logger/logger.service";
import { mockConfigService } from "@api-core/testing/jest.setup";
import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  HttpStatus,
  InternalServerErrorException,
} from "@nestjs/common";
import { mock } from "jest-mock-extended";
import { throwError } from "rxjs";
import { PrismaClientKnownRequestError } from "@api-core/generated/prisma-client/runtime/library";
import { PrismaException } from "../exceptions";
import { NotFoundException } from "../exceptions/notFound.exception";
import { ElinksException } from "../exceptions/elinksException";
import { ErrorInterceptor } from "./error.interceptor";

describe("ErrorInterceptor", () => {
  let errorInterceptor: ErrorInterceptor;
  let mockLoggerService: LoggerService;
  let mockExecutionContext: ExecutionContext;
  let mockCallHandler: CallHandler;

  beforeEach(() => {
    mockConfigService.variable.IS_PRISMA_LOG_ENABLED = true;
    mockLoggerService = mock<LoggerService>({
      log: jest.fn(),
    });
    mockExecutionContext = mock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: (): object => ({}),
      }),
    } as any);
    mockCallHandler = mock<CallHandler>({
      handle: jest.fn(() => ({
        pipe: jest.fn(),
      })),
    } as any);

    errorInterceptor = new ErrorInterceptor(mockLoggerService);
  });

  it("should correctly define the interceptor with an intercept method", () => {
    expect(errorInterceptor.intercept).toBeDefined();
    expect(errorInterceptor.intercept).toBeInstanceOf(Function);

    errorInterceptor.intercept(mockExecutionContext, mockCallHandler);
    expect(mockCallHandler.handle).toHaveBeenCalled();
  });

  it("should correctly handle a ElinksException", (done) => {
    mockCallHandler = mock<CallHandler>({
      handle: () => {
        return throwError(() => new NotFoundException());
      },
    } as any);

    errorInterceptor
      .intercept(mockExecutionContext, mockCallHandler)
      .subscribe({
        error: (error) => {
          expect(error instanceof ElinksException).toBeTruthy();
          expect(error).toEqual(new NotFoundException());
          expect(error.statusCode).toStrictEqual(404);
          expect(mockLoggerService.warn).toHaveBeenCalledWith({
            message: error.message,
            statusCode: error.statusCode,
          });
          done();
        },
      });
  });

  it("should correctly handle basic NestJS Exceptions", (done) => {
    mockCallHandler = mock<CallHandler>({
      handle: () => {
        return throwError(() => new BadRequestException());
      },
    } as any);

    errorInterceptor
      .intercept(mockExecutionContext, mockCallHandler)
      .subscribe({
        error: (error) => {
          expect(error).toEqual(new BadRequestException());
          expect(error.statusCode).toStrictEqual(HttpStatus.BAD_REQUEST);
          expect(mockLoggerService.warn).toHaveBeenCalledWith({
            message: error.message,
            statusCode: error.statusCode,
          });
          done();
        },
      });
  });

  it("should correctly handle known Prisma Exceptions around missing data", (done) => {
    mockCallHandler = mock<CallHandler>({
      handle: () => {
        return throwError(
          () =>
            new PrismaClientKnownRequestError(
              "An operation failed because it depends on one or more records that were required but not found.",
              { code: "P2025", clientVersion: "a-version" }
            )
        );
      },
    } as any);

    errorInterceptor
      .intercept(mockExecutionContext, mockCallHandler)
      .subscribe({
        error: (error) => {
          expect(error instanceof PrismaException).toBeTruthy();
          expect(error.statusCode).toStrictEqual(HttpStatus.NOT_FOUND);
          expect(mockLoggerService.error).toHaveBeenCalledWith(
            expect.objectContaining({
              code: "P2025",
            })
          );
          done();
        },
      });
  });

  it("should correctly handle known Prisma Exceptions", (done) => {
    mockCallHandler = mock<CallHandler>({
      handle: () => {
        return throwError(
          () =>
            new PrismaClientKnownRequestError(
              "The provided database string is invalid",
              { code: "P1013", clientVersion: "a-version" }
            )
        );
      },
    } as any);

    errorInterceptor
      .intercept(mockExecutionContext, mockCallHandler)
      .subscribe({
        error: (error) => {
          expect(error instanceof PrismaException).toBeTruthy();
          expect(error.statusCode).toStrictEqual(HttpStatus.FAILED_DEPENDENCY);
          expect(mockLoggerService.error).toHaveBeenCalledWith(
            expect.objectContaining({
              code: "P1013",
              message: "The provided database string is invalid",
            })
          );
          done();
        },
      });
  });

  it("should fall back to an internal server error", (done) => {
    mockCallHandler = mock<CallHandler>({
      handle: () => {
        return throwError(() => new Error("Big Oof"));
      },
    } as any);

    errorInterceptor
      .intercept(mockExecutionContext, mockCallHandler)
      .subscribe({
        error: (error) => {
          expect(error).toEqual(new InternalServerErrorException());
          expect(error.statusCode).toStrictEqual(
            HttpStatus.INTERNAL_SERVER_ERROR
          );
          expect(mockLoggerService.error).toHaveBeenCalledWith(
            new BadRequestException("Big Oof")
          );
          done();
        },
      });
  });
});
