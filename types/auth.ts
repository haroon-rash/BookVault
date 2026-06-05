/**
 * Auth types — role constants and Role union type.
 */

export const ROLES = {
  ADMIN: "admin",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
