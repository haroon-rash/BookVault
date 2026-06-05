/**
 * Store home — search bar and responsive book catalog grid.
 * Route: /
 */

import { Suspense } from "react";
import { getBooksPage } from "@/actions/books";
import Container from "@/components/ui/container";
import SearchBar from "@/components/store/search-bar";
import BookCatalog from "@/components/store/book-catalog";

type Props = {
  searchParams: Promise<{ search?: string }>;
};

export default async function HomePage({ searchParams }: Props) {
  const { search } = await searchParams;
  const page = await getBooksPage(search);

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <Container className="py-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Welcome to BookVault
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Discover your next great read
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Explore our curated collection of books. Search by title or author,
              view details, and add favorites to your cart.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {search ? `Results for "${search}"` : "All Books"}
            </h2>
            <p className="text-sm text-slate-500">
              {page.totalCount} book{page.totalCount === 1 ? "" : "s"} found
            </p>
          </div>
          <Suspense fallback={null}>
            <SearchBar defaultValue={search} />
          </Suspense>
        </div>

        <BookCatalog
          initialBooks={page.books}
          initialNextCursor={page.nextCursor}
          totalCount={page.totalCount}
          search={search}
        />
      </Container>
    </>
  );
}
