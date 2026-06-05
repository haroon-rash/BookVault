/**
 * Zod schemas and types for book CRUD and catalog search validation.
 */

import { z } from "zod";

/** Author name rules — must contain letters, not numbers only */
const authorNameSchema = z
  .string()
  .trim()
  .min(1, "Author is required")
  .max(100, "Author must be at most 100 characters")
  .regex(
    /^[a-zA-Z\s.'-]+$/,
    "Author name can only contain letters, spaces, hyphens, apostrophes, and periods"
  )
  .refine(
    (val) => /[a-zA-Z]/.test(val),
    "Author name must contain at least one letter (numbers only are not allowed)"
  );

/** Validates book id from URL or delete action */
export const bookIdSchema = z
  .string()
  .trim()
  .min(1, "Book ID is required")
  .cuid("Invalid book ID");

/** Sanitizes home page search query */
export const searchQuerySchema = z
  .string()
  .trim()
  .max(100, "Search query is too long")
  .optional()
  .transform((value) => value || undefined);

/** Server-side book payload — used in create/update actions */
export const bookSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must be at most 200 characters"),
  author: authorNameSchema,
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must be at most 2000 characters"),
  price: z.coerce
    .number({ error: "Price must be a number" })
    .positive("Price must be greater than 0")
    .max(10_000, "Price must be at most $10,000"),
  quantity: z.coerce
    .number({ error: "Quantity must be a number" })
    .int("Quantity must be a whole number")
    .min(0, "Quantity cannot be negative")
    .max(100_000, "Quantity is too large"),
  imageUrl: z
    .string()
    .trim()
    .url("Enter a valid image URL")
    .max(2048, "Image URL is too long"),
});

export type BookInput = z.infer<typeof bookSchema>;

/** Client form values (all strings before coercion on submit) */
export const bookFormSchema = z.object({
  title: bookSchema.shape.title,
  author: bookSchema.shape.author,
  description: bookSchema.shape.description,
  price: z
    .string()
    .trim()
    .min(1, "Price is required")
    .refine((val) => !Number.isNaN(Number(val)), "Price must be a number")
    .refine((val) => Number(val) > 0, "Price must be greater than 0")
    .refine((val) => Number(val) <= 10_000, "Price must be at most $10,000"),
  quantity: z
    .string()
    .trim()
    .min(1, "Quantity is required")
    .refine((val) => /^\d+$/.test(val), "Quantity must be a whole number")
    .refine((val) => Number(val) >= 0, "Quantity cannot be negative")
    .refine((val) => Number(val) <= 100_000, "Quantity is too large"),
  imageUrl: bookSchema.shape.imageUrl,
});

export type BookFormValues = z.infer<typeof bookFormSchema>;

export const searchFormSchema = z.object({
  search: z
    .string()
    .trim()
    .max(100, "Search query is too long")
    .optional()
    .default(""),
});

export type SearchFormValues = z.infer<typeof searchFormSchema>;
