import { cn } from "@/lib/helpers/cn";

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("px-2 mx-auto max-w-7xl sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
