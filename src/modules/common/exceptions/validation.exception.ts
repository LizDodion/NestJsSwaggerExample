import { HttpStatus } from "@nestjs/common";
import { ElinksErrorCodes } from "../errorCodes/elinksErrorCodes";
import { ElinksException } from "./elinksException";

export class ValidationException extends ElinksException {
  constructor(details: object) {
    super(
      ElinksErrorCodes.ValidationFailed,
      "Validation error",
      HttpStatus.BAD_REQUEST,
      details
    );
  }
}
