import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

import { RequestError } from "@/lib/api/Fetcher";

import { toast, ToastType } from "../toast";

export const queryCache = new QueryCache({
  onError: (error: unknown) => {
    if (error instanceof RequestError || error instanceof Error) {
      toast({
        title: "Error",
        description: error.message,
        type: ToastType.ERROR,
      });
    } else {
      toast({
        title: "Error",
        description: "Something went wrong",
        type: ToastType.ERROR,
      });
    }
  },
});

export const mutationCache = new MutationCache({
  onError: (error: unknown) => {
    if (error instanceof RequestError || error instanceof Error) {
      toast({
        title: "Error",
        description: error.message,
        type: ToastType.ERROR,
      });
    } else {
      toast({
        title: "Error",
        description: "Something went wrong",
        type: ToastType.ERROR,
      });
    }
  },
});

export const queryClient = new QueryClient({
  queryCache,
  mutationCache,
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
