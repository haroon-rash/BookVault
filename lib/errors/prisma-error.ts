/**
 * Maps Prisma database errors to user-friendly AppError instances.
 */

import { Prisma } from "@prisma/client";
import {
  AppError,
  DatabaseError,
  InternalError,
  NotFoundError,
  ValidationError,
} from "./app-error";

export function mapPrismaError(error: unknown): AppError | null {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2025":
        return new NotFoundError("Book not found.");
      case "P2002":
        return new ValidationError("A record with this value already exists.");
      case "P2003":
        return new ValidationError("Related record does not exist.");
      default:
        return new DatabaseError("Database request failed.");
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return new ValidationError("Invalid data sent to the database.");
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return new DatabaseError("Unable to connect to the database.");
  }

  return null;
}

/** Picks the best AppError from unknown error, with fallback message */
export function resolveError(error: unknown, fallbackMessage: string): AppError {
  if (error instanceof AppError) {
    return error;
  }

  const prismaError = mapPrismaError(error);
  if (prismaError) {
    return prismaError;
  }

  if (error instanceof Error) {
    return new InternalError(error.message || fallbackMessage);
  }

  return new InternalError(fallbackMessage);
}
