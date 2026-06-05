/**
 * 404 page — shown when a route or resource does not exist.
 */

import Link from "next/link";
import Container from "@/components/ui/container";
import Button from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
        404
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 max-w-md text-slate-600">
        The page you are looking for does not exist or may have been removed.
      </p>
      <Link href="/" className="mt-6">
        <Button>Back to home</Button>
      </Link>
    </Container>
  );
}
