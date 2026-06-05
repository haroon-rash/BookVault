/**
 * Typed application error classes with HTTP-style status codes.
 */

import type { FieldErrors } from "@/types/book";
import { ErrorCode, type ErrorCodeType } from "./codes";

/** Base class for all application errors with HTTP-style codes */
export class AppError extends Error {
  readonly code: ErrorCodeType;
  readonly statusCode: number;
  readonly fieldErrors?: FieldErrors;

  constructor(
    message: string,
    code: ErrorCodeType,
    statusCode = 500,
    fieldErrors?: FieldErrors
  ) {
    super(message);
    this.name = new.target.name;
    this.code = code;
    this.statusCode = statusCode;
    this.fieldErrors = fieldErrors;
  }
}

/** Input failed Zod or business validation rules */
export class ValidationError extends AppError {
  constructor(message: string, fieldErrors?: FieldErrors) {
    super(message, ErrorCode.VALIDATION, 400, fieldErrors);
  }
}

/** User is not logged in */
export class UnauthorizedError extends AppError {
  constructor(message = "You must be signed in as admin.") {
    super(message, ErrorCode.UNAUTHORIZED, 401);
  }
}

/** User is logged in but lacks admin role */
export class ForbiddenError extends AppError {
  constructor(message = "You do not have permission for this action.") {
    super(message, ErrorCode.FORBIDDEN, 403);
  }
}

/** Requested book or record does not exist */
export class NotFoundError extends AppError {
  constructor(message = "Resource not found.") {
    super(message, ErrorCode.NOT_FOUND, 404);
  }
}

/** Prisma or database connection failure */
export class DatabaseError extends AppError {
  constructor(message = "A database error occurred.") {
    super(message, ErrorCode.DATABASE, 500);
  }
}

/** Unexpected server error — catch-all for unhandled failures */
export class InternalError extends AppError {
  constructor(message = "An unexpected error occurred.") {
    super(message, ErrorCode.INTERNAL, 500);
  }
}

/** Type guard — checks if error is a known AppError */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}
