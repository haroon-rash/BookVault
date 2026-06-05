/**
 * Action/query wrappers — catch errors, log them, and return ActionResult.
 */

import type { ActionResult } from "@/types/book";
import { logger } from "@/lib/logger";
import { ErrorCode } from "./codes";
import { resolveError } from "./prisma-error";

type LogContext = {
  action?: string;
  metadata?: Record<string, unknown>;
};

function logAppError(
  error: ReturnType<typeof resolveError>,
  context: LogContext = {}
): void {
  const action = context.action ?? "unknown";
  const meta = {
    action,
    code: error.code,
    statusCode: error.statusCode,
    ...context.metadata,
  };

  switch (error.code) {
    case ErrorCode.DATABASE:
    case ErrorCode.INTERNAL:
      logger.error("Action", error.message, meta);
      break;
    case ErrorCode.UNAUTHORIZED:
    case ErrorCode.FORBIDDEN:
      logger.warn("Action", error.message, meta);
      break;
    default:
      logger.debug("Action", error.message, meta);
  }
}

/** Logs unexpected errors with action name and metadata */
export function logError(error: unknown, context: LogContext = {}): void {
  const appError = resolveError(
    error,
    context.action ?? "An unexpected error occurred."
  );
  logAppError(appError, context);
}

/** Converts any thrown error into a safe ActionResult for the client */
export function toActionResult<T>(
  error: unknown,
  fallbackMessage: string,
  context?: LogContext
): ActionResult<T> {
  const appError = resolveError(error, fallbackMessage);
  logAppError(appError, { ...context, action: context?.action ?? fallbackMessage });

  return {
    success: false,
    error: appError.message,
    code: appError.code,
    statusCode: appError.statusCode,
    fieldErrors: appError.fieldErrors,
  };
}

/** Wraps server mutations — catches errors and returns ActionResult */
export async function executeAction<T>(
  fn: () => Promise<T>,
  options: { fallbackMessage: string; action?: string }
): Promise<ActionResult<T>> {
  const action = options.action ?? "mutation";

  try {
    logger.debug("Action", `Start: ${action}`);
    const data = await fn();
    logger.info("Action", `Success: ${action}`);
    return { success: true, data };
  } catch (error) {
    return toActionResult(error, options.fallbackMessage, { action });
  }
}

/** Wraps read queries — returns fallback value on failure */
export async function executeQuery<T>(
  fn: () => Promise<T>,
  fallback: T,
  action?: string
): Promise<T> {
  const queryName = action ?? "query";

  try {
    logger.debug("Query", `Start: ${queryName}`);
    return await fn();
  } catch (error) {
    const appError = resolveError(error, `Query failed: ${queryName}`);
    logAppError(appError, { action: queryName });
    return fallback;
  }
}
