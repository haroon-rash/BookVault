"use client";

/**
 * Admin book form UI — add or edit a book (logic in use-book-form hook).
 * Used on: /admin
 */

import { getFieldError } from "@/lib/validations";
import { useBookForm } from "@/hooks/use-book-form";
import type { Book } from "@prisma/client";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Button from "@/components/ui/button";
import Alert from "@/components/ui/alert";
import FormField from "@/components/ui/form-field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  editingBook?: Book | null;
  onCancelEdit?: () => void;
};

export default function BookForm({ editingBook, onCancelEdit }: Props) {
  const {
    form,
    fieldErrors,
    loading,
    error,
    success,
    isEditing,
    handleChange,
    handleSubmit,
  } = useBookForm({ editingBook, onCancelEdit });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Book" : "Add New Book"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 md:grid-cols-2"
          noValidate
        >
          <FormField
            label="Title"
            htmlFor="title"
            error={getFieldError(fieldErrors, "title")}
            className="md:col-span-2"
          >
            <Input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              error={Boolean(getFieldError(fieldErrors, "title"))}
            />
          </FormField>

          <FormField
            label="Author"
            htmlFor="author"
            error={getFieldError(fieldErrors, "author")}
            hint="Letters only — e.g. J.K. Rowling"
          >
            <Input
              id="author"
              name="author"
              value={form.author}
              onChange={handleChange}
              error={Boolean(getFieldError(fieldErrors, "author"))}
            />
          </FormField>

          <FormField
            label="Image URL"
            htmlFor="imageUrl"
            error={getFieldError(fieldErrors, "imageUrl")}
            hint="Direct link to JPG or PNG"
          >
            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={form.imageUrl}
              onChange={handleChange}
              error={Boolean(getFieldError(fieldErrors, "imageUrl"))}
            />
          </FormField>

          <FormField
            label="Price (USD)"
            htmlFor="price"
            error={getFieldError(fieldErrors, "price")}
          >
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={handleChange}
              error={Boolean(getFieldError(fieldErrors, "price"))}
            />
          </FormField>

          <FormField
            label="Quantity"
            htmlFor="quantity"
            error={getFieldError(fieldErrors, "quantity")}
          >
            <Input
              id="quantity"
              name="quantity"
              type="number"
              min="0"
              step="1"
              value={form.quantity}
              onChange={handleChange}
              error={Boolean(getFieldError(fieldErrors, "quantity"))}
            />
          </FormField>

          <FormField
            label="Description"
            htmlFor="description"
            error={getFieldError(fieldErrors, "description")}
            className="md:col-span-2"
          >
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              error={Boolean(getFieldError(fieldErrors, "description"))}
            />
          </FormField>

          <div className="flex flex-wrap gap-2 md:col-span-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : isEditing ? "Update Book" : "Add Book"}
            </Button>
            {isEditing && (
              <Button type="button" variant="secondary" onClick={onCancelEdit}>
                Cancel
              </Button>
            )}
          </div>

          {error && (
            <Alert variant="error" className="md:col-span-2">
              {error}
            </Alert>
          )}
          {success && (
            <Alert variant="success" className="md:col-span-2">
              {success}
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
