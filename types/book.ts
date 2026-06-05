/**
 * Book and action types — ActionResult, FieldErrors, and re-exported Book type.
 */

import type { ErrorCodeType } from "@/lib/errors/codes";
import type { Book } from "@prisma/client";

export type FieldErrors = Record<string, string[]>;

export type ActionResult<T = void> =
  | { success: true; data: T }
  | {
      success: false;
      error: string;
      code: ErrorCodeType;
      statusCode: number;
      fieldErrors?: FieldErrors;
    };

export type { Book } from "@prisma/client";
export type { BookInput } from "@/lib/validations/book.schema";

/** Cursor-paginated book list for the store home */
export type BooksPageResult = {
  books: Book[];
  nextCursor: string | null;
  totalCount: number;
  hasMore: boolean;
};
