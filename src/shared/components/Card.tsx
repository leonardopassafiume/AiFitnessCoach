import type { PropsWithChildren, ReactNode } from "react";
import { cn } from "../lib/utils";

type CardProps = PropsWithChildren<{
  title?: string;
  action?: ReactNode;
  className?: string;
}>;

export function Card({ title, action, className, children }: CardProps) {
  return (
    <section
      className={cn(
        "min-w-0 max-w-full resize-y overflow-auto rounded-lg border border-ink/10 bg-white p-4 shadow-soft [container-type:inline-size] sm:resize sm:p-5",
        className,
      )}
    >
      {(title || action) && (
        <div className="mb-4 flex min-w-0 flex-wrap items-start justify-between gap-3">
          {title ? <h2 className="min-w-0 text-base font-bold text-ink">{title}</h2> : <span />}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
