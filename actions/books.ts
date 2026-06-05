"use server";

/**
 * Server actions for book CRUD and public catalog queries.
 * Admin mutations require assertAdmin(); reads are public.
 */

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { assertAdmin } from "@/lib/auth/session";
import { executeAction, executeQuery } from "@/lib/errors";
import { logger } from "@/lib/logger";
import {
  bookIdSchema,
  bookSchema,
  parseInput,
  searchQuerySchema,
  validateInput,
} from "@/lib/validations";
import type { ActionResult, Book, BooksPageResult } from "@/types/book";
import { BOOKS_PAGE_SIZE } from "@/lib/constants";
import type { Prisma } from "@prisma/client";

function buildBookSearchWhere(searchTerm?: string): Prisma.BookWhereInput | undefined {
  if (!searchTerm) return undefined;

  return {
    OR: [
      {
        title: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
      {
        author: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
    ],
  };
}

function parseSearchTerm(search?: string): string | undefined {
  const parsedSearch = validateInput(searchQuerySchema, search);
  if (!parsedSearch.success) {
    logger.debug("getBooks", "Invalid search param ignored", {
      code: parsedSearch.code,
      error: parsedSearch.error,
    });
    return undefined;
  }
  return parsedSearch.data;
}

/** Public — cursor-paginated books for store home (10 per page) */
export async function getBooksPage(
  search?: string,
  cursor?: string
): Promise<BooksPageResult> {
  const emptyPage: BooksPageResult = {
    books: [],
    nextCursor: null,
    totalCount: 0,
    hasMore: false,
  };

  return executeQuery(
    async () => {
      const searchTerm = parseSearchTerm(search);
      const where = buildBookSearchWhere(searchTerm);

      let cursorId: string | undefined;
      if (cursor) {
        const parsedCursor = validateInput(bookIdSchema, cursor);
        if (!parsedCursor.success) return emptyPage;
        cursorId = parsedCursor.data;
      }

      const [totalCount, rows] = await Promise.all([
        prisma.book.count({ where }),
        prisma.book.findMany({
          where,
          take: BOOKS_PAGE_SIZE + 1,
          ...(cursorId ? { cursor: { id: cursorId }, skip: 1 } : {}),
          orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        }),
      ]);

      const hasMore = rows.length > BOOKS_PAGE_SIZE;
      const books = hasMore ? rows.slice(0, BOOKS_PAGE_SIZE) : rows;
      const nextCursor = hasMore ? (books[books.length - 1]?.id ?? null) : null;

      return { books, nextCursor, totalCount, hasMore };
    },
    emptyPage,
    "getBooksPage"
  );
}

/** Public — fetch all books, optional search by title/author (admin / legacy) */
export async function getBooks(search?: string): Promise<Book[]> {
  return executeQuery(
    async () => {
      const searchTerm = parseSearchTerm(search);
      const where = buildBookSearchWhere(searchTerm);

      return prisma.book.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });
    },
    [],
    "getBooks"
  );
}

/** Public — fetch one book by id, returns null if invalid or missing */
export async function getBookById(id: string): Promise<Book | null> {
  const parsedId = validateInput(bookIdSchema, id);
  if (!parsedId.success) return null;

  return executeQuery(
    () => prisma.book.findUnique({ where: { id: parsedId.data } }),
    null,
    "getBookById"
  );
}

/** Admin only — create a new book in the database */
export async function createBook(raw: unknown): Promise<ActionResult<Book>> {
  return executeAction(async () => {
    await assertAdmin();
    const data = parseInput(bookSchema, raw);
    const book = await prisma.book.create({ data });

    revalidatePath("/");
    revalidatePath("/admin");

    return book;
  }, {
    fallbackMessage: "Failed to save book.",
    action: "createBook",
  });
}

/** Admin only — update an existing book */
export async function updateBook(
  id: string,
  raw: unknown
): Promise<ActionResult<Book>> {
  return executeAction(async () => {
    await assertAdmin();
    const bookId = parseInput(bookIdSchema, id);
    const data = parseInput(bookSchema, raw);

    const book = await prisma.book.update({
      where: { id: bookId },
      data,
    });

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath(`/books/${bookId}`);

    return book;
  }, {
    fallbackMessage: "Failed to update book.",
    action: "updateBook",
  });
}

/** Admin only — delete a book by id */
export async function deleteBook(id: string): Promise<ActionResult> {
  return executeAction(async () => {
    await assertAdmin();
    const bookId = parseInput(bookIdSchema, id);

    await prisma.book.delete({ where: { id: bookId } });

    revalidatePath("/");
    revalidatePath("/admin");
  }, {
    fallbackMessage: "Failed to delete book.",
    action: "deleteBook",
  });
}

/** Admin dashboard — inventory summary stats */
export async function getBookStats() {
  return executeQuery(
    async () => {
      const [totalBooks, totalStock, avgPrice] = await Promise.all([
        prisma.book.count(),
        prisma.book.aggregate({ _sum: { quantity: true } }),
        prisma.book.aggregate({ _avg: { price: true } }),
      ]);

      return {
        totalBooks,
        totalStock: totalStock._sum.quantity ?? 0,
        avgPrice: avgPrice._avg.price ?? 0,
      };
    },
    { totalBooks: 0, totalStock: 0, avgPrice: 0 },
    "getBookStats"
  );
}
