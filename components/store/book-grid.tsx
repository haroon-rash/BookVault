/**
 * Responsive grid of book cards with empty-state message.
 * Used on: / (store home)
 */

import type { Book } from "@/types/book";
import BookCard from "./book-card";

type Props = {
  books: Book[];
  search?: string;
};

export default function BookGrid({ books, search }: Props) {
  if (books.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-white py-16 text-center">
        <p className="text-lg font-medium text-slate-900">No books found</p>
        <p className="mt-1 text-sm text-slate-500">
          {search
            ? `No results for "${search}". Try a different search term.`
            : "Check back soon for new arrivals."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
