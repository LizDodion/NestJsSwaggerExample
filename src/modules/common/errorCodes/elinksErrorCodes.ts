import { HttpStatus } from "@nestjs/common";

export enum ElinksErrorCodes {
  NotFound = HttpStatus.NOT_FOUND,
  Unauthorized = HttpStatus.UNAUTHORIZED,
  Forbidden = HttpStatus.FORBIDDEN,
  BadRequest = HttpStatus.BAD_REQUEST,
  PrismaError = HttpStatus.FAILED_DEPENDENCY,
  DependencyError = HttpStatus.FAILED_DEPENDENCY,
  PrismaRecordNotFound = HttpStatus.NOT_FOUND,
  ValidationFailed = 101,
}
