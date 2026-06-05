/**
 * Errors module barrel — re-exports error classes, codes, and handlers.
 */

export { ErrorCode, type ErrorCodeType } from "./codes";
export {
  AppError,
  DatabaseError,
  ForbiddenError,
  InternalError,
  isAppError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "./app-error";
export { mapPrismaError, resolveError } from "./prisma-error";
export {
  executeAction,
  executeQuery,
  logError,
  toActionResult,
} from "./handler";
