import { HttpException, HttpStatus } from "@nestjs/common";

export class ElinksException extends HttpException {
  errorCode: number;
  statusCode: HttpStatus;
  logDetails: Record<string, any>;
  extensions: object;
  constructor(
    code: number,
    message: string,
    statusCode: HttpStatus,
    logDetails?: object
  ) {
    super({ errorCode: code, errorMessage: message, logDetails }, statusCode);
    this.logDetails = logDetails;
    this.errorCode = code;
    this.message = message;
    this.extensions = { errorCode: code };
    this.statusCode = statusCode;
  }

  getResponse(): string | object {
    return {
      statusCode: this.statusCode,
      message: this.message,
      logDetails: this.logDetails,
    };
  }
}
