"use client";

/**
 * Infinite-scroll book catalog — loads next cursor page when user scrolls near bottom.
 * Used on: / (store home)
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { getBooksPage } from "@/actions/books";
import { BOOKS_PAGE_SIZE } from "@/lib/constants";
import type { Book } from "@/types/book";
import BookGrid from "./book-grid";

type Props = {
  initialBooks: Book[];
  initialNextCursor: string | null;
  totalCount: number;
  search?: string;
};

export default function BookCatalog({
  initialBooks,
  initialNextCursor,
  totalCount,
  search,
}: Props) {
  const [books, setBooks] = useState(initialBooks);
  const [nextCursor, setNextCursor] = useState(initialNextCursor);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setBooks(initialBooks);
    setNextCursor(initialNextCursor);
  }, [initialBooks, initialNextCursor, search]);

  const loadMore = useCallback(async () => {
    if (!nextCursor || loading) return;

    setLoading(true);
    try {
      const page = await getBooksPage(search, nextCursor);
      setBooks((prev) => [...prev, ...page.books]);
      setNextCursor(page.nextCursor);
    } finally {
      setLoading(false);
    }
  }, [nextCursor, loading, search]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !nextCursor) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void loadMore();
        }
      },
      { rootMargin: "240px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore, nextCursor]);

  const showingCount = books.length;

  return (
    <div className="space-y-6">
      {totalCount > 0 && (
        <p className="text-sm text-slate-500">
          Showing {showingCount} of {totalCount} book
          {totalCount === 1 ? "" : "s"}
          {nextCursor ? " — scroll for more" : ""}
        </p>
      )}

      <BookGrid books={books} search={search} />

      {nextCursor && (
        <div
          ref={sentinelRef}
          className="flex min-h-12 items-center justify-center py-6"
          aria-hidden={!loading}
        >
          {loading && (
            <p className="text-sm font-medium text-slate-500">
              Loading next {Math.min(BOOKS_PAGE_SIZE, totalCount - showingCount)}{" "}
              books…
            </p>
          )}
        </div>
      )}

      {!nextCursor && showingCount > 0 && totalCount > 10 && (
        <p className="pb-4 text-center text-sm text-slate-400">
          You&apos;ve reached the end of the catalog.
        </p>
      )}
    </div>
  );
}
