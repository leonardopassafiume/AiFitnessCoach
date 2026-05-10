import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "../lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Input({ label, id, className, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="grid gap-2 text-sm font-semibold text-ink/80" htmlFor={inputId}>
      {label}
      <input
        id={inputId}
        className={cn(
          "min-h-11 rounded-md border border-ink/15 bg-white px-3 text-base text-ink outline-none transition placeholder:text-ink/35 focus:border-moss focus:ring-4 focus:ring-mint",
          className,
        )}
        {...props}
      />
    </label>
  );
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export function Textarea({ label, id, className, ...props }: TextareaProps) {
  const textareaId = id ?? props.name;

  return (
    <label className="grid gap-2 text-sm font-semibold text-ink/80" htmlFor={textareaId}>
      {label}
      <textarea
        id={textareaId}
        className={cn(
          "min-h-28 resize-y rounded-md border border-ink/15 bg-white px-3 py-3 text-base text-ink outline-none transition placeholder:text-ink/35 focus:border-moss focus:ring-4 focus:ring-mint",
          className,
        )}
        {...props}
      />
    </label>
  );
}
