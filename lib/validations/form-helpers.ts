/**
 * Book form helpers — default empty state and Book-to-form conversion.
 */

import type { Book } from "@prisma/client";
import type { BookFormValues } from "./book.schema";

/** Default empty book form state */
export const EMPTY_BOOK_FORM: BookFormValues = {
  title: "",
  author: "",
  description: "",
  price: "",
  quantity: "",
  imageUrl: "",
};

/** Converts a Book record into form field values */
export function bookToFormValues(book: Book): BookFormValues {
  return {
    title: book.title,
    author: book.author,
    description: book.description,
    price: String(book.price),
    quantity: String(book.quantity),
    imageUrl: book.imageUrl,
  };
}
