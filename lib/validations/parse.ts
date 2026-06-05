/**
 * Zod parsing helpers — validate input, map field errors, throw or return result.
 */

import { ZodError, type ZodSchema } from "zod";
import { ErrorCode } from "@/lib/errors/codes";
import { ValidationError } from "@/lib/errors";
import type { ActionResult, FieldErrors } from "@/types/book";

/** Turns Zod issues into field → messages map for forms */
export function flattenFieldErrors(error: ZodError): FieldErrors {
  const fieldErrors: FieldErrors = {};

  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_form";
    if (!fieldErrors[key]) fieldErrors[key] = [];
    fieldErrors[key].push(issue.message);
  }

  return fieldErrors;
}

/** Validates input and returns ActionResult (no throw) */
export function validateInput<T>(
  schema: ZodSchema<T>,
  data: unknown
): ActionResult<T> {
  const result = schema.safeParse(data);

  if (!result.success) {
    const fieldErrors = flattenFieldErrors(result.error);
    const firstMessage =
      result.error.issues[0]?.message ?? "Validation failed";

    return {
      success: false,
      error: firstMessage,
      code: ErrorCode.VALIDATION,
      statusCode: 400,
      fieldErrors,
    };
  }

  return { success: true, data: result.data };
}

/** Validates input or throws ValidationError (for executeAction) */
export function parseInput<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const fieldErrors = flattenFieldErrors(result.error);
    const firstMessage =
      result.error.issues[0]?.message ?? "Validation failed";
    throw new ValidationError(firstMessage, fieldErrors);
  }

  return result.data;
}

/** Gets first error message for a single form field */
export function getFieldError(
  fieldErrors: FieldErrors | undefined,
  field: string
): string | undefined {
  return fieldErrors?.[field]?.[0];
}

/** Alias for flattenFieldErrors */
export function mapZodErrors(error: ZodError): FieldErrors {
  return flattenFieldErrors(error);
}
