/**
 * Form label with consistent typography.
 * Used by: components/ui/form-field.tsx
 */

import { cn } from "@/lib/utils";

type Props = React.LabelHTMLAttributes<HTMLLabelElement>;

export default function Label({ className, ...props }: Props) {
  return (
    <label
      className={cn("text-sm font-medium text-slate-700", className)}
      {...props}
    />
  );
}
