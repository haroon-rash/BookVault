"use client";

/**
 * Store search bar — validates query and updates ?search= URL param.
 * Used on: / (store home)
 */

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { searchFormSchema } from "@/lib/validations";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import FormField from "@/components/ui/form-field";

type Props = {
  defaultValue?: string;
};

export default function SearchBar({ defaultValue = "" }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(defaultValue);
  const [error, setError] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validation = searchFormSchema.safeParse({ search: query });
    if (!validation.success) {
      setError(validation.error.issues[0]?.message ?? "Invalid search");
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    const trimmed = validation.data.search.trim();

    if (trimmed) params.set("search", trimmed);
    else params.delete("search");

    router.push(`/?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-xl" noValidate>
      <FormField label="Search catalog" htmlFor="search" error={error}>
        <div className="flex gap-2">
          <Input
            id="search"
            type="search"
            placeholder="Search by title or author..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setError("");
            }}
            error={Boolean(error)}
            className="flex-1"
            maxLength={100}
          />
          <Button type="submit" variant="primary">
            Search
          </Button>
        </div>
      </FormField>
    </form>
  );
}
