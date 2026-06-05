/**
 * Text input with optional error styling.
 * Shared UI primitive used in all forms.
 */

import { cn } from "@/lib/utils";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export default function Input({ className, error, ...props }: Props) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900",
        "placeholder:text-slate-400",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
        "disabled:cursor-not-allowed disabled:opacity-50",
        error
          ? "border-red-300 focus-visible:ring-red-500"
          : "border-slate-200 focus-visible:ring-indigo-500",
        className
      )}
      aria-invalid={error ? true : undefined}
      {...props}
    />
  );
}
