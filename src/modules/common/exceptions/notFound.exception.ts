import { HttpStatus } from "@nestjs/common";
import { ElinksErrorCodes } from "../errorCodes/elinksErrorCodes";
import { ElinksException } from "./elinksException";

export class NotFoundException extends ElinksException {
  constructor() {
    super(ElinksErrorCodes.NotFound, "Not Found", HttpStatus.NOT_FOUND);
  }
}
