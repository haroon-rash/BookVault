/**
 * Validations module barrel — re-exports schemas, parsers, and form helpers.
 */

export { loginSchema, type LoginInput } from "./auth.schema";
export {
  bookFormSchema,
  bookIdSchema,
  bookSchema,
  searchFormSchema,
  searchQuerySchema,
  type BookFormValues,
  type BookInput,
  type SearchFormValues,
} from "./book.schema";
export {
  bookToFormValues,
  EMPTY_BOOK_FORM,
} from "./form-helpers";
export {
  cartItemSchema,
  cartItemsSchema,
  type ValidatedCartItem,
} from "./cart.schema";
export {
  flattenFieldErrors,
  getFieldError,
  mapZodErrors,
  parseInput,
  validateInput,
} from "./parse";
