import type { PropsWithChildren } from "react";
import { cn } from "../lib/utils";

type ResizablePanelProps = PropsWithChildren<{
  className?: string;
}>;

export function ResizablePanel({ children, className }: ResizablePanelProps) {
  return (
    <div className={cn("min-w-0 overflow-hidden resize-x rounded-lg", className)} style={{ minWidth: "min(100%, 18rem)" }}>
      {children}
    </div>
  );
}
