import type { PropsWithChildren } from "react";
import { cn } from "../lib/utils";

type ResponsiveGridProps = PropsWithChildren<{
  className?: string;
  minItemWidth?: string;
}>;

export function ResponsiveGrid({ children, className, minItemWidth = "16rem" }: ResponsiveGridProps) {
  return (
    <div
      className={cn("grid gap-4", className)}
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minItemWidth}), 1fr))` }}
    >
      {children}
    </div>
  );
}
