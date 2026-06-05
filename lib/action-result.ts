/**
 * Shared helpers for handling ActionResult failures on the client.
 */

import { ErrorCode } from "@/lib/errors/codes";
import type { ActionResult, FieldErrors } from "@/types/book";

type FailureOptions = {
  setError: (message: string) => void;
  setFieldErrors?: (errors: FieldErrors) => void;
  onAuthError?: () => void;
};

/** Applies a failed ActionResult to form/UI state; returns true if handled */
export function applyActionFailure(
  result: Extract<ActionResult<unknown>, { success: false }>,
  options: FailureOptions
): boolean {
  if (
    result.code === ErrorCode.UNAUTHORIZED ||
    result.code === ErrorCode.FORBIDDEN
  ) {
    if (options.onAuthError) {
      options.onAuthError();
    } else if (typeof window !== "undefined") {
      window.location.href = "/admin/login";
    }
    return true;
  }

  options.setError(result.error);
  if (result.fieldErrors && options.setFieldErrors) {
    options.setFieldErrors(result.fieldErrors);
  }

  return true;
}

/** User-friendly fallback when an action returns no message */
export function getDefaultErrorMessage(code: string): string {
  switch (code) {
    case ErrorCode.VALIDATION:
      return "Please check your input and try again.";
    case ErrorCode.UNAUTHORIZED:
      return "You must sign in as admin.";
    case ErrorCode.FORBIDDEN:
      return "You do not have permission for this action.";
    case ErrorCode.NOT_FOUND:
      return "The requested item was not found.";
    case ErrorCode.DATABASE:
      return "A database error occurred. Please try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}
