import React from "react";

import { cn } from "@/lib/helpers/cn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, rows, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows ?? 4}
        className={cn(
          "block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-zinc-900  border-zinc-600 bg-zinc-800 sm:text-sm",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
