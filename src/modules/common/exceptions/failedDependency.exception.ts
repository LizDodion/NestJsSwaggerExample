import { HttpStatus } from "@nestjs/common";
import { ElinksErrorCodes } from "../errorCodes/elinksErrorCodes";
import { ElinksException } from "./elinksException";

export class FailedDependencyException extends ElinksException {
  constructor(logDetails?: object) {
    super(
      ElinksErrorCodes.DependencyError,
      "An interaction with a third party dependency has failed",
      HttpStatus.FAILED_DEPENDENCY,
      logDetails
    );
  }
}
