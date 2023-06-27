import { IconLoader2 } from "@tabler/icons-react";

export function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <IconLoader2 size={32} className="text-indigo-600 animate-spin" />
    </div>
  );
}
