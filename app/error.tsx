"use client";

/**
 * Global error boundary — catches unhandled runtime errors and offers retry.
 */

import { useEffect } from "react";
import Button from "@/components/ui/button";
import Container from "@/components/ui/container";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 antialiased">
        <Container className="flex min-h-screen flex-col items-center justify-center py-16 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Something went wrong
          </h1>
          <p className="mt-2 max-w-md text-slate-600">
            An unexpected error occurred. Please try again.
          </p>
          <Button type="button" className="mt-6" onClick={() => reset()}>
            Try again
          </Button>
        </Container>
      </body>
    </html>
  );
}
