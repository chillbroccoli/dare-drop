import React from "react";

import { cn } from "@/lib/helpers/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type ?? "text"}
        className={cn(
          "block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-zinc-900  border-zinc-600 bg-zinc-800 sm:text-sm",
          className
        )}
        {...props}
      />
    );
  }
);

TextInput.displayName = "TextInput";
