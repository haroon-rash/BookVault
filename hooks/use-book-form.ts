"use client";

/**
 * Hook for admin book form — state, Zod validation, create/update actions.
 * Used by: components/admin/book-form.tsx
 */

import { useEffect, useState } from "react";
import type { Book } from "@prisma/client";
import { createBook, updateBook } from "@/actions/books";
import { applyActionFailure } from "@/lib/action-result";
import {
  bookFormSchema,
  bookSchema,
  bookToFormValues,
  EMPTY_BOOK_FORM,
  mapZodErrors,
} from "@/lib/validations";
import type { FieldErrors } from "@/types/book";

type Options = {
  editingBook?: Book | null;
  onCancelEdit?: () => void;
};

export function useBookForm({ editingBook, onCancelEdit }: Options) {
  const [form, setForm] = useState(EMPTY_BOOK_FORM);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const isEditing = Boolean(editingBook);

  useEffect(() => {
    setForm(editingBook ? bookToFormValues(editingBook) : EMPTY_BOOK_FORM);
    setFieldErrors({});
    setError("");
    setSuccess("");
  }, [editingBook]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    setFieldErrors({});

    const clientValidation = bookFormSchema.safeParse(form);
    if (!clientValidation.success) {
      setFieldErrors(mapZodErrors(clientValidation.error));
      setError("Please fix the highlighted fields.");
      setLoading(false);
      return;
    }

    const coerced = bookSchema.safeParse(clientValidation.data);
    if (!coerced.success) {
      setFieldErrors(mapZodErrors(coerced.error));
      setError("Please fix the highlighted fields.");
      setLoading(false);
      return;
    }

    const result = isEditing
      ? await updateBook(editingBook!.id, coerced.data)
      : await createBook(coerced.data);

    setLoading(false);

    if (!result.success) {
      applyActionFailure(result, { setError, setFieldErrors });
      return;
    }

    setSuccess(
      isEditing ? "Book updated successfully." : "Book added successfully."
    );

    if (isEditing) onCancelEdit?.();
    else setForm(EMPTY_BOOK_FORM);
  };

  return {
    form,
    fieldErrors,
    loading,
    error,
    success,
    isEditing,
    handleChange,
    handleSubmit,
  };
}
