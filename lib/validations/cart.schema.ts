/**
 * Zod schemas for client-side cart data persisted in localStorage.
 */

import { z } from "zod";

export const cartItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  author: z.string().min(1),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
  imageUrl: z.string().url(),
  maxQuantity: z.number().int().nonnegative(),
});

export const cartItemsSchema = z.array(cartItemSchema);

export type ValidatedCartItem = z.infer<typeof cartItemSchema>;
