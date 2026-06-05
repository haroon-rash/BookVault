/**
 * Card container — Card, CardHeader, CardTitle, CardContent exports.
 * Shared UI primitive used across admin, store, and cart.
 */

import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: Props) {
  return <div className={cn("p-6 pb-4", className)} {...props} />;
}

export function CardTitle({ className, ...props }: Props) {
  return (
    <h3
      className={cn("text-lg font-semibold text-slate-900", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: Props) {
  return (
    <p className={cn("text-sm text-slate-500 mt-1", className)} {...props} />
  );
}

export function CardContent({ className, ...props }: Props) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}
