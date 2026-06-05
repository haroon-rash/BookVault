/**
 * Public book detail page — cover, description, price, and add-to-cart.
 * Route: /books/[id]
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookById } from "@/actions/books";
import Container from "@/components/ui/container";
import Badge from "@/components/ui/badge";
import BookDetailActions from "@/components/store/book-detail-actions";
import { formatPrice } from "@/lib/utils";
import { Card } from "@/components/ui/card";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BookDetailPage({ params }: Props) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) notFound();

  return (
    <Container className="py-10">
      <Link
        href="/"
        className="mb-6 inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600"
      >
        ← Back to catalog
      </Link>

      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={book.imageUrl}
            alt={book.title}
            className="h-80 w-full object-cover bg-slate-100 md:h-full md:min-h-[480px]"
          />

          <div className="flex flex-col p-8">
            <Badge
              variant={book.quantity === 0 ? "danger" : "success"}
              className="w-fit"
            >
              {book.quantity === 0
                ? "Out of stock"
                : `${book.quantity} in stock`}
            </Badge>

            <h1 className="mt-4 text-3xl font-bold text-slate-900">
              {book.title}
            </h1>
            <p className="mt-2 text-lg text-slate-600">by {book.author}</p>
            <p className="mt-6 text-3xl font-bold text-indigo-600">
              {formatPrice(book.price)}
            </p>

            <div className="mt-8 flex-1">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Description
              </h2>
              <p className="mt-3 leading-relaxed text-slate-700">
                {book.description}
              </p>
            </div>

            <div className="mt-8">
              <BookDetailActions book={book} />
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
}
