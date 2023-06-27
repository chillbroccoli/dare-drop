import { cva, VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "@/lib/helpers/cn";

export const buttonVariants = cva(
  "flex items-center justify-center px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
  {
    variants: {
      intent: {
        primary:
          "bg-indigo-600/60 hover:bg-indigo-600/80 focus-visible:outline-indigo-500",
        danger:
          "bg-red-600/60 hover:bg-red-600/80 focus-visible:outline-red-500",
        success:
          "bg-green-600/60 hover:bg-green-600/80 focus-visible:outline-green-500",
      },
      round: {
        none: "rounded-none",
        sm: "rounded-sm",
        base: "rounded-md",
        full: "rounded-full",
      },
      size: {
        xs: "px-2 py-1 text-xs",
        sm: "px-2 py-1 text-sm",
        base: "px-2.5 py-1.5 text-sm",
        lg: "px-3 py-2 text-sm",
        xl: "px-3.5 py-2.5 text-sm",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      intent: "primary",
      round: "base",
      size: "base",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, intent, fullWidth, type, size, round, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type ?? "button"}
        className={cn(
          buttonVariants({ intent, fullWidth, round, size, className })
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
