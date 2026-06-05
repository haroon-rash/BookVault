/**
 * Password hashing utilities — bcrypt hash and compare for Admin login.
 */

import bcrypt from "bcryptjs";

/** Hash a plain password before storing in Admin table */
export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/** Compare login password with hashed value from database */
export async function comparePassword(password: string, hashed: string) {
  return bcrypt.compare(password, hashed);
}
