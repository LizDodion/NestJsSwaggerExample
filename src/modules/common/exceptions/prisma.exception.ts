import { HttpStatus } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "../../prisma/prisma.service";
import { ElinksErrorCodes } from "../errorCodes/elinksErrorCodes";
import { ElinksException } from "./elinksException";

export class PrismaException extends ElinksException {
  constructor(prismaError: PrismaClientKnownRequestError) {
    let errorCode = ElinksErrorCodes.PrismaError;
    let statusCode = HttpStatus.FAILED_DEPENDENCY;
    let message = "A database error occurred";
    switch (prismaError.code) {
      case "P2025":
      case "P2015":
        errorCode = ElinksErrorCodes.PrismaRecordNotFound;
        statusCode = HttpStatus.NOT_FOUND;
        message = "Could not find a matching database record";
        break;
    }
    super(errorCode, message, statusCode, prismaError);
  }
}
