/**
 * Form field wrapper — label, hint, error message, and child input.
 * Shared UI primitive used in login, book, and search forms.
 */

import { cn } from "@/lib/utils";
import Label from "@/components/ui/label";

type Props = {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
};

/** Reusable form field — label, input, hint, and error message */
export default function FormField({
  label,
  htmlFor,
  error,
  hint,
  children,
  className,
}: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && !error && (
        <p id={`${htmlFor}-hint`} className="text-xs text-slate-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${htmlFor}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
