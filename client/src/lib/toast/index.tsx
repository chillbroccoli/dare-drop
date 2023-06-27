import {
  IconCircleCheck,
  IconExclamationCircle,
  IconX,
} from "@tabler/icons-react";
import ReactHotToast from "react-hot-toast";

import { cn } from "@/lib/helpers/cn";

export enum ToastType {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

type ToastProps = {
  title: string;
  description?: string;
  type?: keyof typeof ToastType;
  duration?: number;
};

export function toast({
  title,
  description,
  type = "SUCCESS",
  duration = 2000,
}: ToastProps) {
  return ReactHotToast.custom(
    (t) => (
      <div
        className={cn(
          "flex w-full flex-col items-center space-y-4 sm:items-end",
          t.visible ? "animate-enter" : "animate-leave"
        )}
      >
        <div className="w-full max-w-sm overflow-hidden border border-indigo-600 rounded-lg shadow-lg bg-zinc-900 ring-1 ring-black ring-opacity-5">
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {type === ToastType.SUCCESS ? (
                  <IconCircleCheck
                    className="w-6 h-6 text-green-400"
                    aria-hidden="true"
                  />
                ) : (
                  <IconExclamationCircle
                    className="w-6 h-6 text-red-400"
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-100">{title}</p>
                <p className="mt-1 text-sm text-gray-500">{description}</p>
              </div>
              <div className="flex flex-shrink-0 ml-4">
                <button
                  type="button"
                  className="inline-flex text-gray-400 rounded-md hover:text-gray-500 focus:outline-none focus:ring-2focus:ring-offset-2 bg-zinc-800 focus:ring-zinc-700"
                  onClick={() => ReactHotToast.remove(t.id)}
                >
                  <span className="sr-only">Close</span>
                  <IconX className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      duration,
    }
  );
}
